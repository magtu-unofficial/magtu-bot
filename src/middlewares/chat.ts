import { chatSign } from "../utils/config";

export default (ctx: any, next: any) => {
  const mention = /\[club\d+?\|.+?\] /;
  const chatFrom = 2000000000;
  ctx.isChat = ctx.message.peer_id >= chatFrom;

  // [club168963511|@public168963511]
  ctx.hasSing =
    ctx.message.text.indexOf(chatSign) === 0 ||
    ctx.message.text.search(mention) !== -1;

  if (ctx.isChat) {
    if (ctx.hasSing) {
      ctx.message.text = ctx.message.text.replace(chatSign, "");
      ctx.message.text = ctx.message.text.replace(mention, "");

      next();
    }
  } else {
    next();
  }
};
