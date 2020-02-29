import log from "../utils/log";
import Ikeyboard from "../interfaces/keyboard";
import defaultKeyboard from "../keyboards/default";
import sendAdmin from "../utils/sendAdmin";
import { unexpectedError } from "../text";

export default (ctx, next) => {
  // Обработка клавиатуры
  ctx.send = async (
    msg: string,
    keyboard: Array<Array<Ikeyboard>> = defaultKeyboard
  ) => {
    const keyboardJSON = JSON.stringify({
      one_time: true,
      buttons: keyboard.map(row => {
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
      ctx.send(unexpectedError);
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
