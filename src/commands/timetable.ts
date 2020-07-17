import ArgsCommand from "../lib/argsCommand";
import date from "../args/date";
import group from "../args/group";
import subgroup from "../args/subgroup";
import timetable from "../reply/timetable";
import { timetableCmd } from "../text";

const cmd = new ArgsCommand(
  timetableCmd,
  [date, group, subgroup],
  async ctx => {
    const { args } = ctx.session;
    await timetable(ctx, args[0], args[1], args[2]);
  }
);

export default cmd;
