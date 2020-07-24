import dateArg from "../args/date";
import teacherArg from "../args/teacher";
import Command from "../lib/argsCommand";
import Timetable, { Itpair, Esubgroup } from "../models/timetable";
import dateTemplate from "../templates/date";
import numberToEmoji from "../templates/numberToEmoji";
import {
  teacherCmd,
  teacherFio,
  timetableForTeacher,
  timetableNotFound
} from "../text";

export const teacherTemplate = (pairs: Array<Itpair>, d: Date) => {
  let answer = timetableForTeacher(dateTemplate(d), pairs[0].teacher);

  const sortedPairs = pairs.sort((a, b) => a.number - b.number);
  // Отображение подгруппы
  for (const pair of sortedPairs) {
    if (!pair.removed) {
      answer += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""}`;
      if (pair.error) {
        // TODO исправить парсер для правильного парсинга строк
        answer += `❓ ${pair.string.replace(/\r?\n/g, "")} - ${pair.group}`;
      } else {
        const subgroup =
          pair.subgroup !== Esubgroup.common
            ? `(${pair.subgroup === Esubgroup.first ? "1" : "2"}) `
            : "";
        answer += ` ${pair.name} - ${pair.group}${subgroup}${
          pair.classroom ? ` 🚪${pair.classroom}` : ""
        }`;
      }
    }
  }

  return answer;
};

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

export default new Command(
  teacherCmd,
  [dateArg, teacherArg],
  async ctx => {
    const date: Date | string = ctx.session.args[0];
    const teacher: string = ctx.session.args[1];

    const teacherRegExp = new RegExp(teacher, "i");
    try {
      if (date instanceof Date) {
        const pairs = await find(date, teacherRegExp);
        ctx.response = teacherTemplate(pairs, date);
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
          ctx.response = answer;
        } else {
          throw Error("Not found");
        }
      }
    } catch (error) {
      if (error.message === "Not found") {
        ctx.response = timetableNotFound(dateTemplate(date));
      } else if (error.message === "Too many teachers") {
        ctx.response = teacherFio;
      }
    }
  },
  4
);
