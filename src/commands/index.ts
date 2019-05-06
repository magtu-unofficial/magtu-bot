import help from "./help";
import timetable from "./timetable";
import { timetableCmd } from "../text";

export default (bot: any) => {
  bot.command(/справка|помощь/, help);
  bot.command(timetableCmd, timetable);
};
