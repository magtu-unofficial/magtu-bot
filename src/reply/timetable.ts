import Esubgroup from "../interfaces/subgroup";
import Timetable from "../models/timetable";
import timetableOneDay from "../templates/timetableOneDay";
import dateTemplate from "../templates/date";
import { timetableNotFound } from "../text";

export default async (
  ctx: any,
  date: Date,
  group: string,
  subgroup: Esubgroup
) => {
  const day = await Timetable.findOne({ date, group });
  if (day) {
    ctx.send(timetableOneDay(day, subgroup));
  } else {
    ctx.send(timetableNotFound(dateTemplate(date)));
  }
};
