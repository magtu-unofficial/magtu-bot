import Command from "./command";
import reportText from "../args/reportText";
import sendAdmin from "../utils/sendAdmin";

const cmd = new Command("report", /ошибка|report/i, [reportText], async ctx => {
  ctx.session.lastReport = new Date();
  await ctx.send("Спасибо за сообщение");
  await sendAdmin(
    ctx.bot,
    `report https://vk.com/id${ctx.message.peer_id} ${Date().toString()}

    ${ctx.session.args[0]}
  
    ${JSON.stringify(ctx.session)}`
  );
});

export default cmd;
