import dateArg from "../args/date";
import teacherArg from "../args/teacher";
import Command from "../lib/argsCommand";
import Timetable, { Itpair, Esubgroup } from "../models/timetable";
import { platform } from "../lib/bot";
import dateTemplate from "../templates/date";
import numberToEmoji from "../templates/numberToEmoji";
import { teacherCmd, timetableForTeacher, timetableNotFound } from "../text";

export const teacherTemplate = (
  pairs: Array<Itpair>,
  d: Date,
  emoji: boolean
) => {
  let answer = timetableForTeacher(dateTemplate(d), pairs[0].teacher);

  const sortedPairs = pairs.sort((a, b) => a.number - b.number);
  // Отображение подгруппы
  for (const pair of sortedPairs) {
    if (!pair.removed) {
      if (emoji) {
        answer += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""}`;
      } else {
        answer += `\n${pair.number}.${pair.changed ? " (зам)" : ""}`;
      }
      if (pair.error) {
        // TODO исправить парсер для правильного парсинга строк
        answer += `❓ ${pair.string.replace(/\r?\n/g, "")} - ${pair.group}`;
      } else {
        const subgroup =
          pair.subgroup !== Esubgroup.common
            ? `(${pair.subgroup === Esubgroup.first ? "1" : "2"})`
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
  const pairs = await Timetable.aggregate([
    { $match: { date, pairs: { $elemMatch: { teacher: teacherRegExp } } } },
    { $unwind: "$pairs" },
    { $match: { "pairs.teacher": teacherRegExp } },
    {
      $project: {
        number: "$pairs.number",
        name: "$pairs.name",
        teacher: "$pairs.teacher",
        classroom: "$pairs.classroom",
        subgroup: "$pairs.subgroup",
        string: "$pairs.string",
        changed: "$pairs.changed",
        removed: "$pairs.removed",
        error: "$pairs.error",
        group: "$displayName"
      }
    },
    { $sort: { number: 1 } }
  ]);

  if (pairs.length === 0) {
    throw Error("Not found");
  }

  return pairs;
};

export default new Command(teacherCmd, [dateArg, teacherArg], async ctx => {
  const date: Date | string = ctx.session.args[0];
  const teacher: string = ctx.session.args[1];

  const emoji = ctx.platform !== platform.viber;

  const teacherRegExp = new RegExp(teacher, "i");
  try {
    if (date instanceof Date) {
      const pairs = await find(date, teacherRegExp);
      ctx.response = teacherTemplate(pairs, date, emoji);
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
          answer += `${teacherTemplate(pairs, findDate, emoji)}\n\n`;
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
    }
  }
});
