import Command from "../lib/argsCommand";
import date from "../args/date";
import teacher from "../args/teacher";
import teacherReply from "../reply/teacher";
import { teacherCmd } from "../text";

const cmd = new Command(
  teacherCmd,
  [date, teacher],
  async ctx => {
    const { args } = ctx.session;
    await teacherReply(ctx, args[0], args[1]);
  },
  4
);

export default cmd;
