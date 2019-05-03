import Express from "express";
import bodyParser from "body-parser";
import Bot from "node-vk-bot-api";
import Session from "node-vk-bot-api/lib/session";
import Stage from "node-vk-bot-api/lib/stage";

import { port, confirm, token, secret } from "./utils/config";
import middlewares from "./middlewares";
import commands from "./commands";
import log from "./utils/log";
import scenes from "./scenes";
import { cmdNotFound } from "./text";

const app = Express();
const bot = new Bot({
  confirmation: confirm,
  token,
  secret
});

const session = new Session();
const stage = new Stage(...scenes);

middlewares(bot);
bot.use(session.middleware());
bot.use(stage.middleware());
commands(bot);

bot.on(async msg => {
  bot.send(cmdNotFound);
});

app.use(bodyParser.json());

app.post("/", bot.webhookCallback);

app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
