export default (ctx, next) => {
  if (ctx.message.reply_message) {
    ctx.message.text = ctx.message.reply_message.text;
  } else if (ctx.message.fwd_messages[0]) {
    ctx.message.text = ctx.message.fwd_messages[0].text;
  }

  next();
};
