import Stage from "node-vk-bot-api/lib/stage";
import help from "./help";
import timetable from "./timetable";
import tt from "../reply/timetable";
import date from "../args/date";
import sb from "../interfaces/subgroup";
import teacher from "./teacher";
import sendAdmin from "../utils/sendAdmin";

export default (bot: any) => {
  const stage = new Stage(timetable.scene, teacher.scene);
  bot.use(stage.middleware());

  timetable.add(bot);
  teacher.add(bot);

  bot.command(/справка|помощь/, help);
  bot.command(/рейд/i, async ctx => {
    await ctx.send("Э, Рейд, лови расписуху на завтра");
    await tt(ctx, date.parser("завтра"), "исп-19-4", sb.second);
  });
  bot.command(/ошибка/i, async ctx => {
    await ctx.send("Спасибо за сообщение");
    await sendAdmin(
      ctx.bot,
      `report https://vk.com/id${ctx.message.peer_id} ${Date().toString()}
${JSON.stringify(ctx.session)}`
    );
  });
};
