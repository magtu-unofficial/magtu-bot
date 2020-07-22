import Koa from "koa";
import bodyParser from "koa-bodyparser";

import help from "./commands/help";
import notify from "./commands/notify";
import report from "./commands/report";
import teacher from "./commands/teacher";
import timetable from "./commands/timetable";
import Router from "./lib/router";
import Vk from "./lib/vk";
import middlewares from "./middlewares";
import { cmdNotFound } from "./text";
import {
  vkToken,
  vkSecret,
  vkConfirm,
  tgToken,
  tgUrl,
  viberToken,
  viberUrl,
  port
} from "./utils/config";

import log from "./utils/log";
import mongoose from "./utils/mongoose";
import Telegram from "./lib/telegram";
import Viber from "./lib/viber";

const app = new Koa();
app.use(bodyParser());

const router = new Router(ctx => {
  ctx.response = cmdNotFound;
});

router.add(timetable, teacher, help, notify, report);

middlewares.push(router.middleware());

const vk = new Vk({
  confirm: vkConfirm,
  token: vkToken,
  secret: vkSecret,
  path: "/"
});
vk.use(...middlewares);
app.use(vk.koaMiddleware());
log.info("VK done");

const telegram = new Telegram({ token: tgToken, path: "/", url: tgUrl });
telegram.use(...middlewares);
app.use(telegram.koaMiddleware());
log.info("Telegram done");

const viber = new Viber({ token: viberToken, url: viberUrl, path: "/" });
viber.use(...middlewares);
app.use(viber.koaMiddleware());

app.use(ctx => {
  if (ctx.method === "GET") {
    ctx.body = "Че ты тут забыл?";
  }
});

log.debug(mongoose.version);
app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
