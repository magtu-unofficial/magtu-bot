export default (ctx, next) => {
  ctx.args = ctx.message.text.split(" ");
  next();
};
