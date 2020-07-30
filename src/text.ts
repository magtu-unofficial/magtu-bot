export const daysWeek = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу"
];

export const soonDate = "ближайшие дни";

export const dateArg = {
  query: "Введите дату. Форматы даты можно посмотреть в справке",
  error: "❌Дата введена не верно. Форматы даты можно посмотреть в справке",
  anotherText: `Дату можно указать одном из следующих форматов:
- ДД.ММ.ГГГГ например 01.03.2019
- ДД.ММ например 15.10
- День недели, например Понедельник
- Короткий день недели, например ВТ
- Вчера, сегодня, завтра, позавчера, послезавтра`,
  tomorrowKey: "Завтра",
  todayKey: "Сегодня",
  yesterdayKey: "Вчера",
  allKey: "Всё доступное",
  another: "Другая дата",

  daysWeekRegExp: [
    { day: 0, regexp: /(вс|воскресенье)/i },
    { day: 1, regexp: /(пн|понедельник)/i },
    { day: 2, regexp: /(вт|вторник)/i },
    { day: 3, regexp: /(ср|сред[ау])/i },
    { day: 4, regexp: /(чт|четверг)/i },
    { day: 5, regexp: /(пт|пятниц[ау])/i },
    { day: 6, regexp: /(сб|суббот[ау])/i }
  ],
  daysRelativeRegExp: [
    { day: -2, regexp: /позавчера/i },
    { day: -1, regexp: /вчера/i },
    { day: 0, regexp: /сегодня/i },
    { day: 1, regexp: /завтра/i },
    { day: 2, regexp: /послезавтра/i }
  ]
};

export const groupArg = {
  query: `Укажите группу`,
  error: `❌Группа указана неверно. Укажите группу со всеми " - ", как в файле замен на портале.
Например ДаК-18-1`
};

export const boolArg = {
  query: `Если включить уведомления, то бот будет присылать вам сообщения каждый раз, когда появляются или обновляются замены на портале
Эти уведомления можно отключить в любой момент этой же командой
Включить уведомления?`,
  error: 'Напишите "Да" или "Нет"',
  trueKey: "Да",
  falseKey: "Нет"
};

export const reportTextArg = {
  query: `Коротко опишите проблему, которая у вас возникла или просто перешлите сообщение в котором содержится ошибка. Для отмены напишите "Отмена"`,
  error: 'Для отмены напишите "Отмена"'
};

export const teacherArg = {
  query: `Введите ФИО преподавателя`,
  error: `❌ФИО преподавателя введено неверно. Введите ФИО преподавателя в формате Фамилия И.О. Например Казанцева Л.А.`
};

export const subgroupArg = {
  query: `Укажите подгруппу`,
  error: `❌Подгруппа указана неверно. Выберите первую или вторую подгруппу`,

  firstSubgroupKey: "Первая",
  secondSubgroupKey: "Вторая",

  firstSubgroupRegexp: /1|перв|один|first/i,
  secondSubgroupRegexp: /2|втор|два|second/i
};

export const timetableKey = "Расписание";
export const timetableCmd = /расп|ti/i;

export const timetableButtonToday = " на сегодня";
export const timetableButtonTomorrow = " на завтра";

export const timetableForGroup = (
  date: string,
  group: string,
  subgroup: string
) => `Расписание для группы ${group} ${subgroup} подгруппы на ${date}`;

export const timetableNotFound = (date: string) => `❌Расписание не найдено.
Проверьте правильность написания названия группы, ФИО преподавателя и даты
Возможно на ${date} еще нет замен`;

export const pairCanceled = `Пара отменена ❌`;
export const firstSubgroup = `первой`;
export const secondSubgroup = `второй`;

export const teacherKey = "Преподаватель";
export const teacherCmd = /Препод|tea/i;

export const timetableForTeacher = (date: string, teacher: string) =>
  `Расписание преподавателя ${teacher} на ${date}`;
export const teacherFio =
  "❌С такой фамилией несколько преподавателей. Укажите фамилию с инициалами";

export const notifyKey = "Уведомления";
export const notifyCmd = /уведомл|notify/i;
export const notifyEnabled = `Уведомления включены.
Отключить уведомления можно в любой момент командой "уведомления выкл"`;
export const notifyDisabled = "Уведомления о новых заменах выключены";

export const helpKey = "Справка";
export const helpCmd = /[Сс]правка|[Пп]омощь|help|start|[Нн]ача/i;
export const helpAnswer = `Чтобы узнать расписание с заменами напишите команду "расписание" и отвечайте на вопросы бота.
Подробная справка: https://mpk.ivanik.ru`;
export const helpTgAnswer = `Чтобы узнать расписание с заменами напишите команду \`расписание\` и отвечайте на вопросы бота.
Подробная справка: https://mpk.ivanik.ru

*Список команд*
/timetable _[дата] [группа] [подгруппа]_ - расписание для группы
/teacher _[дата] [преподаватель]_ - расписание для преподавателя
/notify _[on/off]_ - уведомления о выходе новых замен
/report _[сообщение]_ - сообщить об ошибке
/help - справка
/donate - отправить денег разработчику

*Внимание!*
Этот бот *не является официальным*, а разработчик никак не связан с администрацией МпК или МГТУ.
Расписание и замены скачиваются с портала и обрабатываются автоматически. Выдаваемый ответ *может быть неточным*.

Разработчик: бота @ivanik7
Канал с обновлениями бота: @ivaniklog`;

export const reportKey = "Сообщить об ошибке";
export const reportCmd = /[Оо]шибк|report/i;
export const reportthanks = "Спасибо за сообщение";

export const donateKey = "Донат";
export const donateCmd = /donate|[Дд]онат|[Пп]одд?ер/i;
export const donateAnswer = `Этот бот не является официальным, а я, разработчик, никак не связан с администрацией МпК или МГТУ.
Я обычный студент МпК и каждый месяц я из своего кармана оплачиваю сервер, а так же трачу довольно много своего времени на поддрежку бота в рабочем состоянии.
За полтора года работы над ботом не требовал донатов и не продавал платные услуги. Я разрабатывал бота на чистом энтузиазме.

Если вы хотите помочь оплатить сервер или сказать "спасибо" разработчику бота вы можите отправить денег по этой ссылке: https://donate.stream/ivanik`;

export const newChanges = "Вышли новые замены.";

export const cancelKey = `Отмена`;

export const canceled = `Отменено`;

export const tooManyArgs = `❌Слишком много аргументов`;

export const unexpectedError = `❌Произошла неизвестная ошибка. Повторите попытку позже`;

export const cmdNotFound = `❌Команда не найдена.
Что бы узнать как пользоваться ботом напишите "Справка"`;
