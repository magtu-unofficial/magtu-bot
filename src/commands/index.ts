import help from "./help";

export default (bot: any) => {
  bot.command(/справка|помощь/, help);
};
