import Command from "./command";
import bool from "../args/bool";
import User from "../models/user";

const cmd = new Command("notify", /уведомл/i, [bool], async ctx => {
  await User.setNotify(ctx.message.peer_id, ctx.session.args[0]);
  if (ctx.session.args[0]) {
    await ctx.send(`Уведомления включены.
    Отключить уведомления можно в любой момент коомандой "уведомления выкл"`);
  } else {
    ctx.send("Уведомления о новых заменах выключены");
  }
});

export default cmd;
