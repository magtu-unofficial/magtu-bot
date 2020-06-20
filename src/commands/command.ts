import { argsError } from "../text";
import Iarg from "../interfaces/arg";

class Command {
  constructor(
    name: string,
    regexp: RegExp,
    args: Array<Iarg>,
    done: (ctx: any) => void,
    maxArgs: number = args.length
  ) {
    this.name = name;
    this.regexp = regexp;
    this.args = args;
    this.done = done;
    this.maxArgs = maxArgs;

    // FIXME: Сцены
  }

  add = (bot: any) => {
    bot.command(this.regexp, this.cb);
  };

  cb = async (ctx: any) => {
    const argsCount: number = ctx.args.length;
    if (!ctx.session.args) {
      ctx.session.args = [];
    }

    if (argsCount === 0) {
      ctx.scene.enter(this.name);
    } else if (argsCount >= this.args.length && argsCount <= this.maxArgs) {
      const errors: Array<string> = [];
      for (const i in this.args) {
        if (
          {}.hasOwnProperty.call(this.args, i) &&
          {}.hasOwnProperty.call(ctx.args, i)
        ) {
          const qarg = this.args[i];
          const garg = ctx.args[i];

          if (
            ctx.args.length > this.args.length &&
            parseInt(i, 10) === this.args.length - 1
          ) {
            const inum = parseInt(i, 10);
            const s = ctx.args.slice(inum).join(" ");
            ctx.session.args[i] = qarg.parser(s);
          } else {
            ctx.session.args[i] = qarg.parser(garg);
          }
          if (ctx.session.args[i] === undefined) {
            errors.push(qarg.error);
          }
        }
      }
      if (errors.length === 0) {
        await this.done(ctx);
      } else {
        ctx.send(errors.join("\n"));
      }
    } else {
      ctx.send(argsError);
    }
  };

  name: string;
  regexp: RegExp;
  args: Array<Iarg>;
  done: (ctx: any) => void;
  maxArgs: number;
}

export default Command;
