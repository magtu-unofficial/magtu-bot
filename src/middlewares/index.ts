import logger from "./logger";
import typing from "./typing";
import payload from "./payload";
import send from "./send";

export default (bot: any) => {
  bot.use(logger);
  bot.use(typing);
  bot.use(payload);
  bot.use(send);
};
