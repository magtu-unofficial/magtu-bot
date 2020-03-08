import date from "./date";
import numberToEmoji from "./numberToEmoji";
import { timetableForTeacher } from "../text";
import { Itpair } from "../interfaces/pair";

export default (pairs: Array<Itpair>, d: Date) => {
  let answer = timetableForTeacher(date(d), pairs[0].teacher);

  const sortedPairs = pairs.sort((a, b) => a.number - b.number);

  for (const pair of sortedPairs) {
    if (!pair.removed) {
      answer += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""} `;
      if (pair.error) {
        answer += `❓ ${pair.string.replace(/\r?\n/g, "")}`;
      } else {
        answer += `${pair.name} - ${pair.group} ${
          pair.classroom === "" ? "" : "🚪"
        }${pair.classroom}`;
      }
    }
  }

  return answer;
};
