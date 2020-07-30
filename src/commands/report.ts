import reportText from "../args/reportText";
import Command from "../lib/argsCommand";
import { reportCmd, reportthanks } from "../text";
import sendAdmin from "../utils/sendAdmin";

export default new Command(reportCmd, [reportText], async ctx => {
  ctx.session.lastReport = new Date();
  ctx.response = reportthanks;
  await sendAdmin(
    `*report ${ctx.platform} ${ctx.chat}*
${ctx.text}

\`\`\`
${JSON.stringify(ctx.session, null, 2)}
\`\`\``
  );
});
