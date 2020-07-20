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
import defaultKeyboard from "./templates/defaultKeyboard";
import { cmdNotFound, unexpectedError } from "./text";
// import { vkConfirm, port, vkSecret, vkToken } from "./utils/config";
import { port, tgToken, tgUrl } from "./utils/config";
import log from "./utils/log";
import mongoose from "./utils/mongoose";
import Telegram from "./lib/telegram";

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
vk.setDefault(unexpectedError, defaultKeyboard);
vk.use(...middlewares);
app.use(vk.koaMiddleware());
log.info("VK done");

const telegram = new Telegram({ token: tgToken, path: "/", url: tgUrl });
telegram.setDefault(unexpectedError, defaultKeyboard);
telegram.use(...middlewares);
app.use(telegram.koaMiddleware());
log.info("Telegram done");

log.debug(mongoose.version);
app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
