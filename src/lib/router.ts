import { Next } from "koa";
import { Ictx, Middleware } from "./bot";

interface Iroute {}

export default class Router {
  add(regexp: RegExp, handler: Middleware) {
    this.routes.push({ regexp, handler });
  }

  middleware = async (ctx: Ictx, next: Next) => {
    for (const route of this.routes) {
      if (route.regexp.test(ctx.text)) {
        await route.handler(ctx);
      }
    }
    await next();
  };

  routes: Array<{ regexp: RegExp; handler: Middleware }> = [];
}
