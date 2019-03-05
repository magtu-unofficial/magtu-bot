interface Ictx {
  from: number;
  text: string;
  intent: string;
  parameters: [any];
  answer: string;
}

export default class Router {
  routes: { [s: string]: (ctx: Ictx) => string } = {};

  async route(ctx: Ictx) {
    if (this.routes[ctx.intent]) {
      return this.routes[ctx.intent](ctx);
    }
    return ctx.answer;
  }

  add(intent: string, cb: (ctx: Ictx) => string) {
    this.routes[intent] = cb;
  }
}
