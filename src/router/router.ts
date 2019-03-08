import Ictx from "../interfaces/ctx";

export default class Router {
  constructor(routes: { [s: string]: (ctx: Ictx) => Promise<string> }) {
    this.routes = routes;
  }

  route = async (ctx: Ictx) => {
    console.log(this.routes, ctx.intent);
    if (this.routes[ctx.intent]) {
      return this.routes[ctx.intent](ctx);
    }
    return ctx.answer;
  };

  add(intent: string, cb: (ctx: Ictx) => Promise<string>) {
    this.routes[intent] = cb;
  }

  routes: { [s: string]: (ctx: Ictx) => Promise<string> } = {};
}
