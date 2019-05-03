import Scene from "node-vk-bot-api/lib/scene";
import date from "../utils/date";
import group from "../utils/group";
import subgroup from "../utils/subgroup";
import timetable from "../reply/timetable";
import * as text from "../text";

export default new Scene(
  "timetable",
  ctx => {
    // Начало диалога. Запрос даты
    ctx.scene.next();
    ctx.send(text.dateQuery);
  },

  ctx => {
    // Обработка даты
    ctx.session.date = date(ctx.message.text);
    if (ctx.session.date) {
      // Запрос группы
      ctx.scene.next();
      ctx.send(text.groupQuery);
    } else {
      // Повторный запрос даты
      ctx.scene.step = ctx.scene.step;
      ctx.send(text.dateError);
    }
  },

  ctx => {
    // Обработка группы
    ctx.session.group = group(ctx.message.text);
    if (ctx.session.group) {
      // Запрос подгруппы
      ctx.scene.next();
      ctx.send(text.subgroupQuery);
    } else {
      // Повторный запрос группы
      ctx.scene.step = ctx.scene.step;
      ctx.send(text.groupError);
    }
  },

  ctx => {
    // Обработка подгруппы
    ctx.session.subgroup = subgroup(ctx.message.text);
    if (ctx.session.subgroup) {
      ctx.scene.leave();
      timetable(ctx, ctx.session.date, ctx.session.group, ctx.session.subgroup);
    } else {
      // Повторный запрос подгруппы
      ctx.scene.step = ctx.scene.step;
      ctx.send(text.subgroupError);
    }
  }
);
