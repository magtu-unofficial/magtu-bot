export const timetableCmd = /расп/;

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

export const cmdNotFound = `❌Команда не найдена.
Что бы узнать как пользоваться ботом напишите "Справка"`;

export const firstSubgroupRegexp = /1|перв|один/i;
export const secondSubgroupRegexp = /2|втор|два/i;
