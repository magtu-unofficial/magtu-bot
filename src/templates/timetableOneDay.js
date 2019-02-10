import date from "./date";
import numberToEmoji from "./numberToEmoji";

export default (timetable, subgroup) => {
  let string = `Расписание для группы ${timetable.group} ${
    subgroup === "first" ? "первой" : ""
  }${subgroup === "second" ? "второй" : ""} подгруппы на ${date(
    timetable.date
  )}`;
  for (const pair of timetable.pairs) {
    if (pair.subgroup === subgroup || pair.subgroup === "common") {
      string += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""} `;
      if (pair.removed) {
        string += "пара отменена ❌";
      } else {
        string += `${pair.name} 🎓${pair.teacher} ${
          pair.classroom === "" ? "" : "🚪"
        }${pair.classroom}`;
      }
    }
  }
  return string;
};
