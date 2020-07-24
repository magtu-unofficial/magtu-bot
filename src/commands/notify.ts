import bool from "../args/bool";
import Command from "../lib/argsCommand";
import User from "../models/user";
import { notifyCmd, notifyDisabled, notifyEnabled } from "../text";

export default new Command(notifyCmd, [bool], async ctx => {
  // TODO добавить платформу
  await User.setNotify(ctx.user, ctx.platform, ctx.session.args[0]);
  if (ctx.session.args[0]) {
    ctx.response = notifyEnabled;
  } else {
    ctx.response = notifyDisabled;
  }
});
