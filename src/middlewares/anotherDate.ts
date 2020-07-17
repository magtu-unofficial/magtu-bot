import { dateArg, cancelKey } from "../text";
import { color } from "../lib/bot";

// Костыль для вывода справки по форматам даты из любого места
export default (ctx, next) => {
  if (ctx.message.text === dateArg.another) {
    ctx.send(dateArg.help, [[{ label: cancelKey, color: color.negative }]]);
  } else {
    next();
  }
};
