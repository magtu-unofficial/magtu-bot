import user from "../models/user";
const getSessionKey = (ctx): number => {
  const userId = ctx.message.peer_id || ctx.message.from_id;

  return userId;
};

export default async (ctx, next) => {
  const key = this.getSessionKey(ctx);

  ctx.session = await user.get(key);
  await next();
  await user.set(key, ctx.session);
};
