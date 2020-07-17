import Command from "./command";
import { Ictx } from "./bot";

export interface Iarg {
  query: string;
  // keyboard: Array<Array<Ikeyboard>>; FIXME
  parser: (str: string) => Promise<any> | any;
}

// Ага. А вот я и запутался с тонной колбеков. Такс
// Роутер вызывает check и если команда совпадает, то вызывает handler
// handler должен парсить аргументы и вызывать done
export default class ArgsCommand extends Command {
  constructor(
    regexp: RegExp,
    args: Array<Iarg>,
    done: (ctx: Ictx) => void,
    maxArgs: number = args.length
  ) {
    super(regexp, ctx => this.handler(ctx));
    this.done = done;
    this.args = args;
    this.maxArgs = maxArgs;
  }

  handler = async (ctx: Ictx) => {
    const argsCount: number = ctx.args.length;
    if (!ctx.session.args) {
      ctx.session.args = [];
    }

    if (argsCount === 0) {
      // TODO dialog
    } else if (argsCount <= this.maxArgs) {
      const errors: Array<string> = [];
      const lastArgWithSpace = ctx.args.length !== this.args.length;

      for (const [i, commandArg] of this.args.entries()) {
        try {
          if (
            Object.hasOwnProperty.call(this.args, i) &&
            Object.hasOwnProperty.call(ctx.args, i)
          ) {
            const queryArg = ctx.args[i];
            // Если последний аргумент с пробелами и у нас это разрешено, то это условие
            // выполняиться для последенго аргумента
            if (lastArgWithSpace && i === this.args.length - 1) {
              const argString = ctx.args.slice(i).join(" ");
              ctx.session.args[i] = await commandArg.parser(argString);
            } else {
              ctx.session.args[i] = await commandArg.parser(queryArg);
            }
          }
        } catch (error) {
          errors.push(error.message);
        }
      }
      if (errors.length === 0) {
        await this.done(ctx);
      } else {
        ctx.response = errors.join("\n");
      }
    } else {
      ctx.response = "FIXME argsError";
    }
  };

  done: (ctx: any) => Promise<void> | void;
  args: Array<Iarg>;
  maxArgs: number;
}
