import { manyArgsError } from "../text";

export default async (ctx: any) => {
  if (ctx.args.length > 1) {
    ctx.send(manyArgsError);
  } else {
    ctx.scene.enter("timetable");
  }
};
