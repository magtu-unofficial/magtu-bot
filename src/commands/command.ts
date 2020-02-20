import Scene from "node-vk-bot-api/lib/scene";
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

    const scene = this.args.map((arg, index) => {
      return async (ctx: any) => {
        if (ctx.canceled) {
          ctx.scene.leave();
        } else {
          ctx.session.args[index] = arg.parser(ctx.message.text);

          if (ctx.session.args[index] !== undefined) {
            if (index === args.length - 1) {
              ctx.scene.leave();
              await this.done(ctx);
            } else {
              ctx.scene.next();
              ctx.send(args[index + 1].query, args[index + 1].keyboard);
            }
          } else {
            // Повторный запрос
            ctx.send(arg.error, arg.keyboard);
          }
        }
      };
    });

    this.scene = new Scene(
      this.name,
      (ctx: any) => {
        ctx.scene.next();
        ctx.send(args[0].query, args[0].keyboard);
      },
      ...scene
    );
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
  scene: Scene;
  maxArgs: number;
}

export default Command;
