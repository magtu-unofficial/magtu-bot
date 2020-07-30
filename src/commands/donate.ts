import { Ictx } from "../lib/bot";
import Command from "../lib/command";
import { donateAnswer, donateCmd } from "../text";

export default new Command(donateCmd, (ctx: Ictx) => {
  ctx.response = donateAnswer;
});
