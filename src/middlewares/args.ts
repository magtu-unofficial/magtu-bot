export default (ctx, next) => {
  ctx.args = ctx.message.text.split(" ");
  ctx.args.splice(0, 1);
  next();
};
