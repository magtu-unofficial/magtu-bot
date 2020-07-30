import { Next } from "koa";
import { Ictx } from "../lib/bot";

import { timetableButtonToday, timetableButtonTomorrow } from "../text";

// Костыль?
export default async (ctx: Ictx, next: Next) => {
  if (
    ctx.text.indexOf(timetableButtonToday) !== -1 ||
    ctx.text.indexOf(timetableButtonTomorrow) !== -1
  ) {
    if (ctx.text.indexOf(timetableButtonToday) !== -1) {
      ctx.args[0] = "сегодня";
    } else {
      ctx.args[0] = "завтра";
    }
    ctx.text = "timetable";
    ctx.args[1] = ctx.session.lastQuery.group;
    ctx.args[2] = ctx.session.lastQuery.subgroup;
  }
  await next();
};
