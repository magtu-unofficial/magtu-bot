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

  middleware = async (ctx: Ictx, next: Next) => {
    for (const command of this.commands) {
      if (command.check(ctx.text)) {
        // KEK нужно ли вызывать next тут или внутри обработчика?
        await command.handler(ctx);
        await next();
        return;
      }
    }
    await this.notfound(ctx);
    await next();
  };
  notfound: Middleware;
  commands: Array<Command | ArgsCommand> = [];
}
