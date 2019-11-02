import { daysRelativeRegExp, daysWeekRegExp } from "../text";

export default (str: string, from: Date = new Date()): Date | undefined => {
  // Копирование даты из аргумента
  const currentDate = new Date(from);
  // Сброс времени learn
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  // Обработка даты типа 01.02.2019
  const numbers: Array<number> = str
    .split(/\.|-|\//)
    .map(val => parseInt(val, 10));

  if (
    numbers.length > 1 &&
    numbers.length <= 3 &&
    numbers.findIndex(val => isNaN(val)) === -1
  ) {
    const year = numbers[2] || currentDate.getFullYear();
    return new Date(
      year >= 2000 ? year : year + 2000,
      numbers[1] - 1,
      numbers[0]
    );
  }

  // Обработка дней недели
  for (const key in daysWeekRegExp) {
    if ({}.hasOwnProperty.call(daysWeekRegExp, key)) {
      const element = daysWeekRegExp[key];
      const day = parseInt(key, 10);
      if (str.search(element) === 0) {
        const date = new Date(currentDate);

        // День на текущей или следующей неделе
        if (day - currentDate.getDay() >= 0) {
          // Разность текущего и необходимого дня прибавляется к
          date.setDate(currentDate.getDate() + day - currentDate.getDay());
        } else {
          date.setDate(currentDate.getDate() + 7 - currentDate.getDay() + day);
        }

        return date;
      }
    }
  }

  // Обработка относительных дат
  for (const key in daysRelativeRegExp) {
    if ({}.hasOwnProperty.call(daysRelativeRegExp, key)) {
      const element = daysRelativeRegExp[key];
      const day = parseInt(key, 10);
      if (str.search(element) === 0) {
        const date = new Date(currentDate);

        date.setDate(currentDate.getDate() + day);

        return date;
      }
    }
  }

  return undefined;
};
