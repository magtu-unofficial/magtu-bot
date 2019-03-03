import Timetable from "../models/timetable";
import timetableOneDay from "../templates/timetableOneDay";

export default async ctx => {
  try {
    if (!ctx.parameters.subgroup.stringValue) {
      throw Error("subgroup");
    }

    const date = new Date(ctx.parameters.date.stringValue);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const dateNextYear = new Date(date);
    dateNextYear.setFullYear(dateNextYear.getFullYear() - 1);

    console.log(date, dateNextYear);

    const day = await Timetable.findOne({
      date: { $in: [date, dateNextYear] },
      group: ctx.parameters.group.stringValue.toLowerCase()
    });
    console.log(
      ctx.from,
      ctx.text,
      date,
      ctx.parameters.group.stringValue.toLowerCase(),
      ctx.parameters.subgroup.stringValue
    );
    console.log(day);
    return timetableOneDay(day, ctx.parameters.subgroup.stringValue);
  } catch (error) {
    console.log("error", error.message);
    return ctx.answer;
  }
};
