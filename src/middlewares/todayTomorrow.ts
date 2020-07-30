import { Next } from "koa";
import { Ictx } from "../lib/bot";

import {
  timetableButtonToday,
  timetableButtonTomorrow,
  dateArg,
  timetableKey
} from "../text";

// Костыль?
export default async (ctx: Ictx, next: Next) => {
  if (ctx.text.indexOf(timetableButtonToday) !== -1) {
    ctx.text = `${timetableKey} ${dateArg.todayKey} ${ctx.session.lastQuery.group} ${ctx.session.lastQuery.subgroup}`;
  } else if (ctx.text.indexOf(timetableButtonTomorrow) !== -1) {
    ctx.text = `${timetableKey} ${dateArg.tomorrowKey} ${ctx.session.lastQuery.group} ${ctx.session.lastQuery.subgroup}`;
  }

  await next();
};
