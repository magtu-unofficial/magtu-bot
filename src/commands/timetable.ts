export default async (ctx: any) => {
  if (ctx.args.length > 1) {
    ctx.send("Слишком много аргументов");
  } else {
    ctx.scene.enter("timetable");
  }
};
