export default (ctx, next) => {
  try {
    ctx.payload = JSON.parse(ctx.message.payload);
  } catch (error) {
    ctx.payload = {};
  }

  if (ctx.payload.command) {
    ctx.message.text = ctx.payload.command;
  }

  next();
};
