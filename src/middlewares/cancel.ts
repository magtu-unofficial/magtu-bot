import { Next } from "koa";
import { Ictx } from "../lib/bot";
import { cancelKey, canceled } from "../text";

export default async (ctx: Ictx, next: Next) => {
  if (ctx.text === cancelKey) {
    ctx.canceled = true;
    ctx.session.currentCommand = -1;
    ctx.response = canceled;
  }
  await next();
};
