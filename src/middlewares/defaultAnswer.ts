import { Next } from "koa";
import { Ictx } from "../lib/bot";

import { unexpectedError } from "../text";
import defaultKeyboard from "../templates/defaultKeyboard";

export default async (ctx: Ictx, next: Next) => {
  if (!ctx.response) ctx.response = unexpectedError;
  if (!ctx.keyboard) ctx.keyboard = defaultKeyboard;
  if (!ctx.oneTime) ctx.oneTime = false;
  if (!ctx.params) ctx.params = {};
  await next();
};
