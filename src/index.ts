import Koa from "koa";
import bodyParser from "koa-bodyparser";

import help from "./commands/help";
import notify from "./commands/notify";
import report from "./commands/report";
import teacher from "./commands/teacher";
import timetable from "./commands/timetable";
import { platform } from "./lib/bot";
import Router from "./lib/router";
import Vk from "./lib/vk";
import Telegram from "./lib/telegram";
import Viber from "./lib/viber";
import middlewares from "./middlewares";
import User from "./models/user";
import { cmdNotFound, newChanges } from "./text";
import {
  vkToken,
  vkSecret,
  vkConfirm,
  vkPath,
  tgToken,
  tgUrl,
  tgPath,
  viberToken,
  viberUrl,
  viberPath,
  port
} from "./utils/config";
import log from "./utils/log";
import mongoose from "./utils/mongoose";
import donate from "./commands/donate";

const app = new Koa();
app.use(bodyParser());

const router = new Router(ctx => {
  ctx.response = cmdNotFound;
});

router.add(timetable, teacher, notify, report, help, donate);

middlewares.push(router.middleware());

const vk = new Vk({
  confirm: vkConfirm,
  token: vkToken,
  secret: vkSecret,
  path: vkPath
});
vk.use(...middlewares);
app.use(vk.koaMiddleware());
log.info("VK done");

const telegram = new Telegram({ token: tgToken, url: tgUrl, path: tgPath });
telegram.use(...middlewares);
app.use(telegram.koaMiddleware());

const viber = new Viber({ token: viberToken, url: viberUrl, path: viberPath });
viber.use(...middlewares);
app.use(viber.koaMiddleware());

app.use(async ctx => {
  if (ctx.method === "GET" && ctx.path === "/notify") {
    const vkList = await User.getNotifyList(platform.vk);
    vk.sendMessages(vkList, newChanges);

    const tgList = await User.getNotifyList(platform.telegram);
    telegram.sendMessages(tgList, newChanges);

    const viberList = await User.getNotifyList(platform.viber);
    viber.sendMessages(viberList, newChanges);
    ctx.body = "ok";
  }
});

app.use(ctx => {
  if (ctx.method === "GET") {
    ctx.body = "Че ты тут забыл?";
  }
});

log.debug(mongoose.version);
app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
