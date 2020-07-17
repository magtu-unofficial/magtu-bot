import Koa from "koa";
import bodyParser from "koa-bodyparser";

import Router from "./lib/router";
import Vk from "./lib/vk";

import { port, confirm, token, secret } from "./utils/config";
import { generic } from "./middlewares";
import log from "./utils/log";
import timetable from "./commands/timetable";

const app = new Koa();
app.use(bodyParser());

const router = new Router(ctx => {
  ctx.response = "Не найдено ничего";
});

router.add(timetable);

const vk = new Vk({ confirm, token, secret, path: "/" });
vk.use(...generic, router.middleware);
app.use(vk.koaMiddleware());

app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
