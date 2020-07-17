import Command from "../lib/argsCommand";
import bool from "../args/bool";
import User from "../models/user";
import { notifyEnabled, notifyDisabled, notifyCmd } from "../text";

const cmd = new Command(notifyCmd, [bool], async ctx => {
  await User.setNotify(ctx.message.peer_id, ctx.session.args[0]);
  if (ctx.session.args[0]) {
    await ctx.send(notifyEnabled);
  } else {
    ctx.send(notifyDisabled);
  }
});

export default cmd;
