export default class Router {
  constructor() {
    this.routes = {};

    this.route = async ctx => {
      if (this.routes[ctx.intent]) {
        return this.routes[ctx.intent](ctx);
      }
      return ctx.answer;
    };
  }

  add(intent, cb) {
    this.routes[intent] = cb;
  }
}
