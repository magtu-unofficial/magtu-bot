import date from "./date";
import numberToEmoji from "./numberToEmoji";
import {
  timetableForGroup,
  firstSubgroup,
  secondSubgroup,
  pairCanceled
} from "../text";
import Esubgroup from "../interfaces/subgroup";

export default (timetable, subgroup) => {
  let answer = timetableForGroup(
    date(timetable.date),
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
        answer += `${pair.name} 🎓${pair.teacher} ${
          pair.classroom === "" ? "" : "🚪"
        }${pair.classroom}`;
      }
    }
  }

  return answer;
};
