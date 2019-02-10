const week = [
  "восренье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу"
];

export default date => {
  return `${week[date.getDay()]} ${
    date.getDate() > 9 ? "" : "0"
  }${date.getDate()}.${date.getMonth() + 1 > 9 ? "" : "0"}${date.getMonth() +
    1}.${date.getFullYear()}`;
};
