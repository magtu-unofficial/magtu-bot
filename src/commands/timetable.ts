import dateArg from "../args/date";
import groupArg from "../args/group";
import subgroupArg from "../args/subgroup";
import ArgsCommand from "../lib/argsCommand";
import { color, platform } from "../lib/bot";
import Timetable, { Ipair, Esubgroup } from "../models/timetable";
import dateTemplate from "../templates/date";
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
  subgroup: Esubgroup,
  emoji: Boolean
) => {
  let answer = timetableForGroup(
    dateTemplate(date),
    displayName,
    subgroup === "first" ? firstSubgroup : secondSubgroup
  );

  const sortedPairs = pairs.sort((a, b) => a.number - b.number);
  for (const pair of sortedPairs) {
    if (
      pair.subgroup === subgroup ||
      pair.subgroup === Esubgroup.common ||
      !pair.subgroup
    ) {
      if (emoji) {
        answer += `\n${numberToEmoji(pair.number)}${
          pair.subgroup === Esubgroup.first ||
          pair.subgroup === Esubgroup.second
            ? "➡️"
            : ""
        }${pair.changed ? "✏" : ""}`;
      } else {
        answer += `\n${pair.number}.${pair.changed ? " (зам)" : ""}`;
      }
      if (pair.removed) {
        answer += ` ${pairCanceled}`;
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
    const emoji = ctx.platform !== platform.viber;

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
              subgroup,
              emoji
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
            subgroup,
            emoji
          );
        } else {
          throw Error("Not found");
        }
      }

      ctx.keyboard.push([
        {
          label: `${group}${timetableButtonToday}`,
          color: color.default
        },
        {
          label: `${group}${timetableButtonTomorrow}`,
          color: color.default
        }
      ]);

      ctx.session.lastQuery = {
        group,
        subgroup
      };
    } catch (error) {
      if (error.message === "Not found") {
        ctx.response = timetableNotFound(dateTemplate(date));
      }
    }
  }
);
