import { Next } from "koa";
import { Ictx } from "../lib/bot";

import log from "../utils/log";

export default async (ctx: Ictx, next: Next) => {
  const time = Date.now();
  await next();
  log.info(
    `${ctx.name ? `${ctx.name} (${ctx.chat})` : ctx.chat} ${
      Date.now() - time
    }ms: ${ctx.text} - ${
      !ctx.response || ctx.response.length < 20
        ? ctx.response
        : `${ctx.response.substr(0, 30)}...`
    }`
  );
};
