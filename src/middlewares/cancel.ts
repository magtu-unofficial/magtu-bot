import { Next } from "koa";
import { Ictx } from "../lib/bot";
import { cancelKey, canceled } from "../text";

export default (ctx: Ictx, next: Next) => {
  // TODO button payload
  if (ctx.text === cancelKey) {
    ctx.session.currentCommand = -1;
    ctx.response = canceled;
  }
  next();
};
