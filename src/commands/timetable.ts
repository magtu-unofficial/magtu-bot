import dateArg from "../args/date";
import groupArg from "../args/group";
import subgroupArg from "../args/subgroup";
import Esubgroup from "../interfaces/subgroup";
import ArgsCommand from "../lib/argsCommand";
import Timetable from "../models/timetable";
import dateTemplate from "../templates/date";
import numberToEmoji from "../templates/numberToEmoji";
import {
  firstSubgroup,
  pairCanceled,
  secondSubgroup,
  timetableCmd,
  timetableForGroup,
  timetableNotFound
} from "../text";

// TODO клавиатура
// import { color } from "../interfaces/keyboard";
// import defaultKeyboard from "../templates/defaultKeyboard";

// const keyboard = (group: string, subgroup: Esubgroup) => {
//   const keys = [...defaultKeyboard];

//   keys.push([
//     {
//       label: `${group} на сегодня`,
//       color: color.default,
//       payload: { command: `расписание сегодня ${group} ${subgroup}` }
//     },
//     {
//       label: `${group} на завтра`,
//       color: color.default,
//       payload: { command: `расписание завтра ${group} ${subgroup}` }
//     }
//   ]);

//   return keys;
// };

const timetableTemplate = (timetable, subgroup) => {
  let answer = timetableForGroup(
    dateTemplate(timetable.date),
    timetable.displayName,
    subgroup === "first" ? firstSubgroup : secondSubgroup
  );

  const sortedPairs = timetable.pairs.sort((a, b) => a.number - b.number);

  for (const pair of sortedPairs) {
    if (pair.subgroup === subgroup || pair.subgroup === Esubgroup.common) {
      answer += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""} `;
      if (pair.removed) {
        answer += pairCanceled;
      } else if (pair.error) {
        answer += `❓ ${pair.string.replace(/\r?\n/g, "")}`;
      } else {
        answer += `${pair.name} ${pair.teacher ? `🎓${pair.teacher}` : ""} ${
          pair.classroom ? `🚪${pair.classroom}` : ""
        }`;
      }
    }
  }

  return answer;
};

export default new ArgsCommand(
  timetableCmd,
  [dateArg, groupArg, subgroupArg],
  async ctx => {
    const date: Date | string = ctx.session.args[0];
    const group: string = ctx.session.args[1];
    const subgroup: Esubgroup = ctx.session.args[2];

    try {
      if (typeof date === "string") {
        const from = new Date();
        from.setDate(from.getDate() - 1);

        const to = new Date();
        to.setDate(to.getDate() + 7);

        const days = await Timetable.find({
          date: { $gte: from, $lt: to },
          group
        });

        let answer = "";
        if (days.length !== 0) {
          for (const day of days) {
            answer += `${timetableTemplate(day, subgroup)}\n\n`;
          }
          ctx.response = answer; // , keyboard(days[0].displayName, subgroup));
        } else {
          throw Error("Not found");
        }
      } else {
        const day = await Timetable.findOne({ date, group });
        if (day) {
          ctx.response = timetableTemplate(day, subgroup); // , keyboard(day.displayName, subgroup));
        } else {
          throw Error("Not found");
        }
      }
    } catch (error) {
      if (error.message === "Not found") {
        ctx.response = timetableNotFound(dateTemplate(date));
      }
    }
  }
);
