import { Next } from "koa";
import { Ictx } from "../lib/bot";

export default (ctx: Ictx, next: Next) => {
  try {
    ctx.payload = JSON.parse(ctx.message.payload);
  } catch (error) {
    ctx.payload = {};
  }

  if (ctx.payload.command) {
    ctx.text = ctx.payload.command;
  }

  next();
};
