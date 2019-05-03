export const helpAnswer = `Чтобы узнать расписание с заменами напишите команду "расписание" и отвечайте на вопросы бота.
Если пара была заменена, то рядом с ней будет значок карандаша ✏`;

export const daysWeek = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу"
];

export const timetableForGroup = (
  date: string,
  group: string,
  subgroup: string
) => `Расписание для группы ${group} ${subgroup} подгруппы на ${date}`;
export const firstSubgroup = `первой`;
export const secondSubgroup = `второй`;
export const pairCanceled = `Пара отменена ❌`;

export const dateQuery = `Укажите день`;
export const groupQuery = `Укажите группу`;
export const subgroupQuery = `Укажите подгруппу`;

export const dateError = `❌Дата указана неверно. Укажите дату в одном из следующих форматах:
✅ДД.ММ.ГГГГ например 01.03.2019
✅ДД.ММ например 15.10
✅День недели, например понедельник
✅Вчера, сегодня, завтра, позавчера, послезавтра`;

export const groupError = `❌Группа указана неверно. Укажите группу со всеми "-", как в файле замен на портале.
Например ДаК-18-1`;

export const subgroupError = `❌Подгруппа указана неверно. Выберите первую или вторую подгруппу`;

export const manyArgsError = `❌Слишком много аргументов. Для справки напишите "Справка"`;
export const fewArgsError = `❌Слишком мало аргументов. Для справки напишите "Справка"`;

export const cmdNotFound = `❌Команда не найдена.
Что бы узнать как пользоваться ботом напишите "Справка"`;

export const timetableCmd = /расп|ti/i;
export const helpCmd = /cправка|помощь|help/i;

export const firstSubgroupRegexp = /1|перв|один/i;
export const secondSubgroupRegexp = /2|втор|два/i;

export const daysWeekRegExp = {
  "0": /(вс|воскресенье)/i,
  "1": /(пн|понедельник)/i,
  "2": /(вт|вторник)/i,
  "3": /(ср|сред[ау])/i,
  "4": /(чт|четверг)/i,
  "5": /(пт|пятниц[ау])/i,
  "6": /(сб|суббот[ау])/i
};

export const daysRelativeRegExp = {
  "-2": /позавчера/i,
  "-1": /вчера/i,
  "0": /сегодня/i,
  "1": /завтра/i,
  "2": /послезавтра/i
};
