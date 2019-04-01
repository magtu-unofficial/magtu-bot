export default (ctx, next) => {
  try {
    ctx.payload = JSON.parse(ctx.message.payload);
  } catch (error) {
    ctx.payload = {};
  }
  console.log("Мидлварь payload добавленна");

  next();
};
