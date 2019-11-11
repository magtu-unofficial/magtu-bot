import Command from "./command";
import date from "../args/date";
import group from "../args/group";
import subgroup from "../args/subgroup";
import timetable from "../reply/timetable";

const cmd = new Command(
  "timetable",
  /Расп/i,
  [date, group, subgroup],
  async ctx => {
    const { args } = ctx.session;
    await timetable(ctx, args[0], args[1], args[2]);
  }
);

export default cmd;
