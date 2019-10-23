import help from "./help";
import timetable from "./timetable";
import { timetableCmd } from "../text";

import tt from "../reply/timetable";
import date from "../utils/date";
import sb from "../interfaces/subgroup";

export default (bot: any) => {
  bot.command(/справка|помощь/, help);
  bot.command(timetableCmd, timetable);
  bot.command(/рейд/i, async ctx => {
    await ctx.send("Э, Рейд, лови расписуху на завтра");
    tt(ctx, date("завтра"), "исп-19-4", sb.second);
  });
};
