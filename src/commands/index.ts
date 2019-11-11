import Stage from "node-vk-bot-api/lib/stage";
import help from "./help";
import timetable from "./timetable";
import tt from "../reply/timetable";
import date from "../args/date";
import sb from "../interfaces/subgroup";

export default (bot: any) => {
  const stage = new Stage(timetable.scene);
  bot.use(stage.middleware());

  bot.command(/справка|помощь/, help);
  timetable.add(bot);
  bot.command(/рейд/i, async ctx => {
    await ctx.send("Э, Рейд, лови расписуху на завтра");
    await tt(ctx, date.parser("завтра"), "исп-19-4", sb.second);
  });
};
