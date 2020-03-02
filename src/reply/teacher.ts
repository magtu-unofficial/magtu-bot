import Timetable from "../models/timetable";
import { Itpair } from "../interfaces/pair";
import teacherTemplate from "../templates/teacher";
import dateTemplate from "../templates/date";
import { timetableNotFound, teacherFio } from "../text";

const find = async (
  date: Date,
  teacherRegExp: RegExp
): Promise<Array<Itpair>> => {
  const result = await Timetable.find({
    date,
    pairs: { $elemMatch: { teacher: teacherRegExp } }
  });

  if (result.length === 0) {
    throw Error("Not found");
  }

  const pairs: Array<Itpair> = [];
  const teachers = [];
  for (const group of result) {
    for (const pair of group.toObject().pairs) {
      if (pair.teacher && pair.teacher.search(teacherRegExp) !== -1) {
        if (teachers.indexOf(pair.teacher) === -1) {
          teachers.push(pair.teacher);
        }
        pairs.push({ ...pair, group: group.displayName });
      }
    }
  }
  if (teachers.length > 1) {
    throw Error("Too many teachers");
  }
  return pairs;
};

export default async (ctx, date: Date | string, teacher: string) => {
  const teacherRegExp = new RegExp(teacher, "i");
  try {
    if (date instanceof Date) {
      const pairs = await find(date, teacherRegExp);
      await ctx.send(teacherTemplate(pairs, date));
    } else if (date === "all") {
      let answer = "";
      const findDate = new Date();
      findDate.setHours(0);
      findDate.setMinutes(0);
      findDate.setSeconds(0);
      findDate.setMilliseconds(0);

      for (let i = 0; i <= 7; i += 1) {
        try {
          const pairs = await find(findDate, teacherRegExp);
          answer += `${teacherTemplate(pairs, findDate)}\n\n`;
        } catch (error) {
          if (error.message !== "Not found") {
            throw error;
          }
        }

        findDate.setDate(findDate.getDate() + 1);
      }
      if (answer.length !== 0) {
        await ctx.send(answer);
      } else {
        throw Error("Not found");
      }
    }
  } catch (error) {
    if (error.message === "Not found") {
      await ctx.send(timetableNotFound(dateTemplate(date)));
    } else if (error.message === "Too many teachers") {
      await ctx.send(teacherFio);
    }
  }
};
