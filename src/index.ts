import Koa from "koa";
import bodyParser from "koa-bodyparser";

import help from "./commands/help";
import notify from "./commands/notify";
import report from "./commands/report";
import teacher from "./commands/teacher";
import timetable from "./commands/timetable";
import Router from "./lib/router";
import Vk from "./lib/vk";
import { generic } from "./middlewares";
import defaultKeyboard from "./templates/defaultKeyboard";
import { cmdNotFound, unexpectedError } from "./text";
import { confirm, port, secret, token } from "./utils/config";
import log from "./utils/log";
import mongoose from "./utils/mongoose";

const app = new Koa();
app.use(bodyParser());

const router = new Router(ctx => {
  ctx.response = cmdNotFound;
});

router.add(timetable, teacher, help, notify, report);

const vk = new Vk({ confirm, token, secret, path: "/" });
vk.setDefault(unexpectedError, defaultKeyboard);
vk.use(...generic, router.middleware());
app.use(vk.koaMiddleware());

log.debug(mongoose.version);
app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
