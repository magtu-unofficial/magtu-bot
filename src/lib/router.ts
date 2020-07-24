import { Next } from "koa";
import { Ictx, Middleware } from "./bot";
import Command from "./command";
import ArgsCommand from "./argsCommand";

export default class Router {
  constructor(notfound: Middleware) {
    this.notfound = notfound;
  }

  add(...cmd: Array<Command | ArgsCommand>) {
    this.commands.push(...cmd);
  }

  middleware = () => {
    for (const [iterator, value] of this.commands.entries()) {
      value.id = iterator;
    }

    return async (ctx: Ictx, next: Next) => {
      if (
        ctx.session &&
        (ctx.session.currentCommand === undefined ||
          ctx.session.currentCommand === null)
      ) {
        ctx.session.currentCommand = -1;
      }

      if (ctx.canceled) {
        await next();
        return;
      }

      if (!ctx.session || ctx.session.currentCommand === -1) {
        for (const command of this.commands) {
          if (command.check(ctx.text)) {
            await command.handler(ctx);
            await next();
            return;
          }
        }
      } else {
        const command = this.commands[ctx.session.currentCommand];
        await command.handler(ctx);
        await next();
        return;
      }
      await this.notfound(ctx);
      await next();
    };
  };

  notfound: Middleware;
  commands: Array<Command | ArgsCommand> = [];
}
