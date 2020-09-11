import { Next } from "koa";
import { Ictx } from "../lib/bot";
import log from "../utils/log";
import {
  timetableButtonToday,
  timetableButtonTomorrow,
  dateArg,
  timetableKey
} from "../text";

// Костыль?
export default async (ctx: Ictx, next: Next) => {
  try {
    if (ctx.text.indexOf(timetableButtonToday) !== -1) {
      ctx.text = `${timetableKey} ${dateArg.todayKey} ${ctx.session.lastQuery.group} ${ctx.session.lastQuery.subgroup}`;
    } else if (ctx.text.indexOf(timetableButtonTomorrow) !== -1) {
      ctx.text = `${timetableKey} ${dateArg.tomorrowKey} ${ctx.session.lastQuery.group} ${ctx.session.lastQuery.subgroup}`;
    }
  } catch (error) {
    log.warn("Ошибка с быстрыми кнопками");
  }

  await next();
};
