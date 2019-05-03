import Scene from "node-vk-bot-api/lib/scene";
import date from "../utils/date";
import group from "../utils/group";
import subgroup from "../utils/subgroup";
import timetable from "../reply/timetable";
import * as text from "../text";
import dateKeyboard from "../keyboards/date";
import groupKeyboard from "../keyboards/group";
import subgroupKeyboard from "../keyboards/subgroup";

export default new Scene(
  "timetable",
  ctx => {
    // Начало диалога. Запрос даты
    ctx.scene.next();
    ctx.send(text.dateQuery, dateKeyboard);
  },

  ctx => {
    if (ctx.canceled) {
      ctx.scene.leave();
    } else {
      // Обработка даты
      ctx.session.date = date(ctx.message.text);
      if (ctx.session.date) {
        // Запрос группы
        ctx.scene.next();
        ctx.send(text.groupQuery, groupKeyboard);
      } else {
        // Повторный запрос даты
        // ctx.scene.step = ctx.scene.step;
        ctx.send(text.dateError, dateKeyboard);
      }
    }
  },

  ctx => {
    if (ctx.canceled) {
      ctx.scene.leave();
    } else {
      // Обработка группы
      ctx.session.group = group(ctx.message.text);
      if (ctx.session.group) {
        // Запрос подгруппы
        ctx.scene.next();
        ctx.send(text.subgroupQuery, subgroupKeyboard);
      } else {
        // Повторный запрос группы
        // ctx.scene.step = ctx.scene.step;
        ctx.send(text.groupError, groupKeyboard);
      }
    }
  },

  ctx => {
    if (ctx.canceled) {
      ctx.scene.leave();
    } else {
      // Обработка подгруппы
      ctx.session.subgroup = subgroup(ctx.message.text);
      if (ctx.session.subgroup) {
        ctx.scene.leave();
        timetable(
          ctx,
          ctx.session.date,
          ctx.session.group,
          ctx.session.subgroup
        );
      } else {
        // Повторный запрос подгруппы
        // ctx.scene.step = ctx.scene.step;
        ctx.send(text.subgroupError, subgroupKeyboard);
      }
    }
  }
);
