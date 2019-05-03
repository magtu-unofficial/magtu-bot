import Esubgroup from "../interfaces/subgroup";
import Timetable from "../models/timetable";
import timetableOneDay from "../templates/timetableOneDay";

export default async (
  ctx: any,
  date: Date,
  group: string,
  subgroup: Esubgroup
) => {
  const day = await Timetable.findOne({ date, group });
  ctx.send(timetableOneDay(day, subgroup));
};
