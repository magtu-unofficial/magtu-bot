import { Next } from "koa";
import { Ictx } from "../lib/bot";

import user from "../models/user";

export default async (ctx: Ictx, next: Next) => {
  ctx.session = await user.get(ctx.chat || ctx.user, ctx.platform);
  await next();
  await user.set(ctx.chat || ctx.user, ctx.platform, ctx.session);
};
