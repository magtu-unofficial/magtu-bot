import log from "../utils/log";

export default (ctx, next) => {
  try {
    ctx.payload = JSON.parse(ctx.message.payload);
  } catch (error) {
    ctx.payload = {};
  }
  log.debug("Мидлварь payload добавленна");

  next();
};
