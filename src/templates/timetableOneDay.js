import date from "./date";
import numberToEmoji from "./numberToEmoji";

export default (timetable, subgroup) => {
  let string = `Расписание для группы ${timetable.group} ${
    subgroup === "first" ? "первой" : ""
  }${subgroup === "second" ? "второй" : ""} подгруппы на ${date(
    timetable.date
  )}`;
  for (let i = 0; i < 10; i += 1) {
    const pair = timetable.pairs.find(e => {
      return (
        e.number === i && (e.subgroup === subgroup || e.subgroup === "common")
      );
    });
    if (pair) {
      string += `\n${numberToEmoji(pair.number)}${pair.changed ? "✏" : ""} `;
      if (pair.removed) {
        string += "Пара отменена ❌";
      } else if (pair.error) {
        string += `❓ ${pair.string.replace(/\r?\n/g, "")}`;
      } else {
        string += `${pair.name} 🎓${pair.teacher} ${
          pair.classroom === "" ? "" : "🚪"
        }${pair.classroom}`;
      }
    }
  }
  return string;
};
