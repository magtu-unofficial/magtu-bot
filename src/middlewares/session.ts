import { Next } from "koa";
import { Ictx } from "../lib/bot";

import user from "../models/user";

export const getSessionKey = (ctx: Ictx): string => {
  const userId = ctx.platform + (ctx.chat || ctx.user);

  return userId;
};

export default async (ctx: Ictx, next: Next) => {
  const key = getSessionKey(ctx);

  ctx.session = await user.get(key);
  await next();
  await user.set(key, ctx.session);
};
