import date from "./date";
import numberToEmoji from "./numberToEmoji";

const maxPairsCount = 10;

export default (timetable, subgroup) => {
  let answer = `Расписание для группы ${timetable.group} ${
    subgroup === "first" ? "первой" : ""
  }${subgroup === "second" ? "второй" : ""} подгруппы на ${date(
    timetable.date
  )}`;
  for (let i = 0; i < maxPairsCount; i += 1) {
    const pair = timetable.pairs.find(e => {
      return (
        e.number === i && (e.subgroup === subgroup || e.subgroup === "common")
      );
    });
    if (pair) {
      answer += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""} `;
      if (pair.removed) {
        answer += "Пара отменена ❌";
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
