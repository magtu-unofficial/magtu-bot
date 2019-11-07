import { argsError } from "../text";

export default async (ctx: any) => {
  if (ctx.args.length > 1) {
    ctx.send(argsError);
  } else {
    ctx.scene.enter("timetable");
  }
};
