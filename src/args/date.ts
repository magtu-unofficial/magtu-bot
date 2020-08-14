import { dateArg, cancelKey } from "../text";
import { color } from "../lib/bot";

export const parser = (str: string, from: Date = new Date()): Date | string => {
  if (str.search(/Вс(ё|е)|all/i) !== -1) {
    return "all";
  }

  // Копирование даты из аргумента
  const currentDate = new Date(from);
  // Сброс времени learn
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  // Обработка даты типа 01.02.2019
  const splitedString: Array<string> = str.split(/[.-/ ]/);
  const numbers: Array<number> = splitedString.map(val => parseInt(val, 10));

  if (
    (numbers.length === 2 || numbers.length === 3) &&
    numbers.findIndex(val => isNaN(val) || val === 0) === -1 &&
    splitedString[0].length <= 2 &&
    splitedString[1].length <= 2
  ) {
    const year = numbers[2] || currentDate.getFullYear();
    return new Date(
      year >= 2000 ? year : year + 2000,
      numbers[1] - 1,
      numbers[0]
    );
  }

  // Обработка дней недели
  for (const i of dateArg.daysWeekRegExp) {
    if (str.search(i.regexp) === 0) {
      const date = new Date(currentDate);

      // День на текущей или следующей неделе
      if (i.day - currentDate.getDay() >= 0) {
        // Разность текущего и необходимого дня прибавляется к
        date.setDate(currentDate.getDate() + i.day - currentDate.getDay());
      } else {
        date.setDate(currentDate.getDate() + 7 - currentDate.getDay() + i.day);
      }

      return date;
    }
  }

  // Обработка относительных дат
  for (const i of dateArg.daysRelativeRegExp) {
    if (str.search(i.regexp) === 0) {
      const date = new Date(currentDate);

      date.setDate(currentDate.getDate() + i.day);

      return date;
    }
  }

  // Вывод справки
  if (str === dateArg.another) {
    throw Error(dateArg.anotherText);
  }

  throw Error(dateArg.error);
};

export default {
  query: dateArg.query,
  keyboard: [
    [
      { label: dateArg.allKey, color: color.default },
      { label: dateArg.todayKey, color: color.default },
      { label: dateArg.tomorrowKey, color: color.default }
    ],
    [
      { label: dateArg.another, color: color.positive },
      { label: cancelKey, color: color.negative }
    ]
  ],
  parser
};
