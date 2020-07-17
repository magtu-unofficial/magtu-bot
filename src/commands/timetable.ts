import dateArg from "../args/date";
import groupArg from "../args/group";
import subgroupArg from "../args/subgroup";
import Ipair from "../interfaces/pair";
import Esubgroup from "../interfaces/subgroup";
import ArgsCommand from "../lib/argsCommand";
import { color } from "../lib/bot";
import Timetable from "../models/timetable";
import dateTemplate from "../templates/date";
import defaultKeyboard from "../templates/defaultKeyboard";
import numberToEmoji from "../templates/numberToEmoji";
import {
  firstSubgroup,
  pairCanceled,
  secondSubgroup,
  timetableButtonToday,
  timetableButtonTomorrow,
  timetableCmd,
  timetableForGroup,
  timetableNotFound
} from "../text";

export const timetableTemplate = (
  date: Date,
  displayName: string,
  pairs: Array<Ipair>,
  subgroup: Esubgroup
) => {
  let answer = timetableForGroup(
    dateTemplate(date),
    displayName,
    subgroup === "first" ? firstSubgroup : secondSubgroup
  );

  const sortedPairs = pairs.sort((a, b) => a.number - b.number);
  // TODO отображение подруппы
  for (const pair of sortedPairs) {
    if (
      pair.subgroup === subgroup ||
      pair.subgroup === Esubgroup.common ||
      !pair.subgroup
    ) {
      answer += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""}`;
      if (pair.removed) {
        answer += pairCanceled;
      } else if (pair.error) {
        answer += `❓ ${pair.string.replace(/\r?\n/g, "")}`;
      } else {
        answer += ` ${pair.name}${pair.teacher ? ` 🎓${pair.teacher}` : ""}${
          pair.classroom ? ` 🚪${pair.classroom}` : ""
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
            answer += `${timetableTemplate(
              day.date,
              day.displayName,
              day.pairs,
              subgroup
            )}\n\n`;
          }
          ctx.response = answer;
        } else {
          throw Error("Not found");
        }
      } else {
        const day = await Timetable.findOne({ date, group });
        if (day) {
          ctx.response = timetableTemplate(
            day.date,
            day.displayName,
            day.pairs,
            subgroup
          );
        } else {
          throw Error("Not found");
        }
      }

      ctx.keyboard = [...defaultKeyboard];
      ctx.keyboard.push([
        {
          label: `${group}${timetableButtonToday}`,
          color: color.default,
          payload: { command: `расписание сегодня ${group} ${subgroup}` }
        },
        {
          label: `${group}${timetableButtonTomorrow}`,
          color: color.default,
          payload: { command: `расписание завтра ${group} ${subgroup}` }
        }
      ]);
    } catch (error) {
      if (error.message === "Not found") {
        ctx.response = timetableNotFound(dateTemplate(date));
      }
    }
  }
);
