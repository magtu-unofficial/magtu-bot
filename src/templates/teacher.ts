import date from "./date";
import numberToEmoji from "./numberToEmoji";
import { timetableForTeacher } from "../text";
import { Itpair } from "../interfaces/pair";

const maxPairsCount = 10;

export default (pairs: Array<Itpair>, d: Date) => {
  let answer = timetableForTeacher(date(d), pairs[0].teacher);

  for (let i = 0; i < maxPairsCount; i += 1) {
    const pair = pairs.find(e => {
      return e.number === i;
    });
    if (pair) {
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
