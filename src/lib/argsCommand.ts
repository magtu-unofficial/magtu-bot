import Command from "./command";
import { Ictx, Ikeyboard } from "./bot";

export interface Iarg {
  query: string;
  keyboard?: Array<Array<Ikeyboard>>;
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

  responseArg(ctx: Ictx, argId: number): void {
    ctx.session.currentArg = argId;
    ctx.response = this.args[argId].query;
    ctx.keyboard = this.args[argId].keyboard;
  }

  handler = async (ctx: Ictx) => {
    const argsCount: number = ctx.args.length;
    if (!ctx.session.args) {
      ctx.session.args = [];
    }

    if (ctx.session && ctx.session.currentCommand !== -1) {
      // Внутри диалога
      try {
        ctx.session.args[ctx.session.currentArg] = await this.args[
          ctx.session.currentArg
        ].parser(ctx.text);

        if (ctx.session.currentArg < this.args.length - 1) {
          this.responseArg(ctx, ctx.session.currentArg + 1);
        } else {
          ctx.session.currentCommand = -1;
        }
      } catch (error) {
        ctx.response = error.message;
      } finally {
        if (ctx.session.currentCommand === -1) {
          await this.done(ctx);
        }
      }
    } else if (argsCount === 0) {
      // Начало диалога
      ctx.session.currentCommand = this.id;
      this.responseArg(ctx, 0);
    } else if (argsCount <= this.maxArgs) {
      // Одной строкой
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
    }
  };

  done: (ctx: any) => Promise<void> | void;
  args: Array<Iarg>;
  maxArgs: number;
}
