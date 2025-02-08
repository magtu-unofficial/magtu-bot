import { Ictx } from "../lib/bot";
import Command from "../lib/command";
import { classroomCmd, eolAnser } from "../text";

export default new Command(classroomCmd, (ctx: Ictx) => {
  ctx.response = eolAnser;
});
