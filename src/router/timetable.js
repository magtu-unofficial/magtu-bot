import Timetable from "../models/timetable";
import timetableOneDay from "../templates/timetableOneDay";

export default async ctx => {
  try {
    if (!ctx.parameters.subgroup.stringValue) {
      throw Error("subgroup");
    }
    const date = new Date(ctx.parameters.date.stringValue);
    date.setHours(0);
    const day = await Timetable.findOne({
      date,
      group: ctx.parameters.group.stringValue
    });
    console.log(
      ctx.from,
      ctx.text,
      date,
      ctx.parameters.group.stringValue,
      ctx.parameters.subgroup.stringValue
    );
    return timetableOneDay(day, ctx.parameters.subgroup.stringValue);
  } catch (error) {
    console.log("error", error.message);
    return ctx.answer;
  }
};
