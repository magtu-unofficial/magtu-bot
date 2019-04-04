import logger from "./logger";
import typing from "./typing";
import payload from "./payload";
import send from "./send";
import args from "./args";
import chat from "./chat";

export default (bot: any) => {
  bot.use(chat);
  bot.use(typing);
  bot.use(payload);
  bot.use(send);
  bot.use(args);
  bot.use(logger);
};
