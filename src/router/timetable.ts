import log from "../utils/log";
import Timetable from "../models/timetable";
import timetableOneDay from "../templates/timetableOneDay";
import Ictx from "../interfaces/ctx";

export default async (ctx: Ictx): Promise<string> => {
  try {
    if (!ctx.parameters.subgroup.stringValue) {
      throw Error("Не найдена подгруппа в параметрах");
    }

    const date = new Date(ctx.parameters.date.stringValue);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const dateNextYear = new Date(date);
    dateNextYear.setFullYear(dateNextYear.getFullYear() - 1);

    log.debug(`${date} ${dateNextYear}`);

    const day = await Timetable.findOne({
      date: { $in: [date, dateNextYear] },
      group: ctx.parameters.group.stringValue.toLowerCase()
    });
    log.debug(
      `${ctx.from} ${
        ctx.text
      } ${date} ${ctx.parameters.group.stringValue.toLowerCase()} ${
        ctx.parameters.subgroup.stringValue
      }`
    );
    return timetableOneDay(day, ctx.parameters.subgroup.stringValue);
  } catch (error) {
    log.warn(`timetable ${error.message}`);
    return ctx.answer;
  }
};
