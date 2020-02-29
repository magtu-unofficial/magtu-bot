import Express from "express";
import bodyParser from "body-parser";
import Bot from "node-vk-bot-api";

import { port, confirm, token, secret, notifySecret } from "./utils/config";
import middlewares from "./middlewares";
import commands from "./commands";
import log from "./utils/log";
import { cmdNotFound } from "./text";
import User from "./models/user";
import sendMany from "./utils/sendMany";

const app = Express();
const bot = new Bot({
  confirmation: confirm,
  token,
  secret
});

middlewares(bot);
commands(bot);

bot.on(async ctx => {
  ctx.send(cmdNotFound);
});

app.use(bodyParser.json());

app.post("/", bot.webhookCallback);

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/notify", async (req, res) => {
  if (req.query.secret === notifySecret) {
    res.send("ok");
    const list = await User.getNotifyList();
    await sendMany(bot, list, `Вышли новые замены. ${req.query.text || ""}`);
  } else {
    res.send("Wrong secret");
  }
});

app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
