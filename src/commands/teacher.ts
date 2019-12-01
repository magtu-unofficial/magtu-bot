import Command from "./command";
import date from "../args/date";
import teacher from "../args/teacher";
import teacherReply from "../reply/teacher";

const cmd = new Command(
  "teacher",
  /Препод/i,
  [date, teacher],
  async ctx => {
    const { args } = ctx.session;
    await teacherReply(ctx, args[0], args[1]);
  },
  4
);

export default cmd;
