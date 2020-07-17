import reportText from "../args/reportText";
import Command from "../lib/argsCommand";
import { reportCmd, reportthanks } from "../text";
import sendAdmin from "../utils/sendAdmin";

const cmd = new Command(reportCmd, [reportText], async ctx => {
  ctx.session.lastReport = new Date();
  ctx.response = reportthanks;
  await sendAdmin(
    ctx.bot,
    `report https://vk.com/id${ctx.message.peer_id} ${Date().toString()}

    ${ctx.session.args[0]}
  
    ${JSON.stringify(ctx.session)}`
  );
});

export default cmd;
