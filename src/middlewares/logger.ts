import { Next } from "koa";
import { Ictx } from "../lib/bot";

import log from "../utils/log";

// TODO: Лог ответа на сообщение, время обработки
export default (ctx: Ictx, next: Next) => {
  log.info(`${ctx.chat}: ${ctx.text}`);
  next();
};
