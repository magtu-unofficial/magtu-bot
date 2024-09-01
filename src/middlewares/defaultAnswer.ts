import { Next } from "koa";
import { color, Ictx, Ikeyboard } from "../lib/bot";
import {
  classroomKey,
  helpKey,
  notifyKey,
  teacherKey,
  timetableKey,
  unexpectedError
} from "../text";

const defaultKeyboard: Array<Array<Ikeyboard>> = [
  [
    { label: timetableKey, color: color.primary },
    { label: teacherKey, color: color.default }
  ],
  [
    { label: classroomKey, color: color.default },
    { label: notifyKey, color: color.default },
    { label: helpKey, color: color.default },
  ],
];

export default async (ctx: Ictx, next: Next) => {
  if (!ctx.text) ctx.text = "";
  if (!ctx.response) ctx.response = unexpectedError;
  if (!ctx.keyboard) ctx.keyboard = [...defaultKeyboard];
  if (!ctx.params) ctx.params = {};
  await next();
};
