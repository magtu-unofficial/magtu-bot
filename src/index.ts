import Express from "express";
import bodyParser from "body-parser";
import Bot from "node-vk-bot-api";

import { port, confirm, token, secret } from "./utils/config";
import middlewares from "./middlewares";
import commands from "./commands";
import log from "./utils/log";
import { cmdNotFound } from "./text";

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

app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
