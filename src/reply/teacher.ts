import Timetable from "../models/timetable";
import { Itpair } from "../interfaces/pair";
import teacherTemplate from "../templates/teacher";
import dateTemplate from "../templates/date";
import { timetableNotFound } from "../text";

export default async (ctx, date: Date, teacher: string) => {
  const teacherRegExp = new RegExp(teacher, "i");
  const result = await Timetable.find({
    date,
    pairs: { $elemMatch: { teacher: teacherRegExp } }
  });

  if (result.length > 0) {
    const pairs: Array<Itpair> = [];

    for (const group of result) {
      for (const pair of group.toObject().pairs) {
        if (pair.teacher && pair.teacher.toLowerCase() === teacher) {
          pairs.push({
            ...pair,
            group: group.displayName
          });
        }
      }
    }
    await ctx.send(teacherTemplate(pairs, date));
  } else {
    ctx.send(timetableNotFound(dateTemplate(date)));
  }
};
