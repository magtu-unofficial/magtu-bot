import { Ictx, platform } from "../lib/bot";
import Command from "../lib/command";
import { helpAnswer, helpTgAnswer, helpCmd } from "../text";

export default new Command(helpCmd, (ctx: Ictx) => {
  if (ctx.platform === platform.telegram) {
    ctx.response = helpTgAnswer;
  } else {
    ctx.response = helpAnswer;
  }
});
