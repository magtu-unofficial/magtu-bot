import { Ictx } from "../lib/bot";
import Command from "../lib/command";
import { helpAnswer, helpCmd } from "../text";

export default new Command(helpCmd, (ctx: Ictx) => {
  ctx.response = helpAnswer;
});
