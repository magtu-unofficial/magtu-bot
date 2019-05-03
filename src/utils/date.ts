const days: { [key: string]: RegExp } = {
  "0": /(вс|воскресенье)/i,
  "1": /(пн|понедельник)/i,
  "2": /(вт|вторник)/i,
  "3": /(ср|сред[ау])/i,
  "4": /(чт|четверг)/i,
  "5": /(пт|пятниц[ау])/i,
  "6": /(сб|суббот[ау])/i
};

const relative: { [key: string]: RegExp } = {
  "-2": /позавчера/i,
  "-1": /вчера/i,
  "0": /сегодня/i,
  "1": /завтра/i,
  "2": /послезавтра/i
};

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
    return new Date(
      numbers[2] || currentDate.getFullYear(),
      numbers[1] - 1,
      numbers[0]
    );
  }

  // Обработка дней недели
  for (const key in days) {
    if (days.hasOwnProperty(key)) {
      const element = days[key];
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
  for (const key in relative) {
    if (relative.hasOwnProperty(key)) {
      const element = relative[key];
      const day = parseInt(key, 10);
      if (str.search(element) === 0) {
        const date = new Date(currentDate);

        date.setDate(currentDate.getDate() + day);

        return date;
      }
    }
  }
};
