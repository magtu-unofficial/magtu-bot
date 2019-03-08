const week = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу"
];

const singleDigit = 9;

export default (date: Date) =>
  `${week[date.getDay()]} ${
    date.getDate() > singleDigit ? "" : "0"
  }${date.getDate()}.${
    date.getMonth() + 1 > singleDigit ? "" : "0"
  }${date.getMonth() + 1}.${date.getFullYear()}`;
