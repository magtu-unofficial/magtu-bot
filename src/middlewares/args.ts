import { Next } from "koa";
import { Ictx } from "../lib/bot";

export default (ctx: Ictx, next: Next) => {
  ctx.args = ctx.text.split(" ");
  ctx.args.splice(0, 1);
  next();
};
