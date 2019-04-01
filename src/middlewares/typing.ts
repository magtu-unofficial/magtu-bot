export default (ctx, next) => {
  ctx.bot.execute("messages.setActivity", {
    user_id: ctx.message.peer_id,
    type: "typing"
  });
  next();
};
