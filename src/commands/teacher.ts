import { Ictx } from "../lib/bot";
import Command from "../lib/command";
import { teacherCmd, eolAnser } from "../text";

export default new Command(teacherCmd, (ctx: Ictx) => {
  ctx.response = eolAnser;
});
