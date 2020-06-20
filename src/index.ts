import Koa from "koa";
import bodyParser from "koa-bodyparser";

import Vk from "./lib/vk";

import { port, confirm, token, secret } from "./utils/config";
import { generic } from "./middlewares";
import log from "./utils/log";

const app = new Koa();
app.use(bodyParser());

const vk = new Vk({ confirm, token, secret, path: "/" });
vk.use(...generic);
app.use(vk.koaMiddleware());

app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
