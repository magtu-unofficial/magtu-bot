import { Ictx } from "../lib/bot";
import Command from "../lib/command";
import { timetableCmd, eolAnser } from "../text";

export default new Command(timetableCmd, (ctx: Ictx) => {
  ctx.response = eolAnser;
});
