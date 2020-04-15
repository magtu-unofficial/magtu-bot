import log from "../utils/log";
import Ikeyboard, { color } from "../interfaces/keyboard";
import sendAdmin from "../utils/sendAdmin";
import { reportKey } from "../text";
import defaultKeyboard from "../templates/defaultKeyboard";

export default (ctx, next) => {
  ctx.send = async (msg: string, keyboard: Array<Array<Ikeyboard>>) => {
    const now = new Date();
    const sendKeyboard = keyboard || [...defaultKeyboard];

    if (
      !keyboard &&
      (!ctx.session.lastReport ||
        now.getTime() - ctx.session.lastReport.getTime() > 86400000)
    ) {
      sendKeyboard.push([
        {
          label: reportKey,
          color: color.default,
          payload: { command: "ошибка" }
        }
      ]);
    }

    const keyboardJSON = JSON.stringify({
      one_time: true,
      buttons: sendKeyboard.map(row => {
        return row.map(key => {
          return {
            action: {
              type: "text",
              payload: JSON.stringify(key.payload || {}),
              label: key.label
            },
            color: key.color
          };
        });
      })
    });

    try {
      await ctx.bot.execute("messages.send", {
        peer_id: ctx.message.peer_id,
        message: msg,
        dont_parse_links: 1,
        keyboard: keyboardJSON,
        random_id: Date.now()
      });
    } catch (error) {
      // FIXME
      if (!ctx.isChat)
        await sendAdmin(
          ctx.bot,
          `send error https://vk.com/id${ctx.message.peer_id}
${msg}
${JSON.stringify(error)}`
        );
    }
  };
  log.debug("Мидлварь send добавленна");
  next();
};
