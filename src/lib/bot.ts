import { Next } from "koa";
import compose from "koa-compose";

export interface Ictx {
  chat?: number;
  user: number;
  isChat?: boolean;
  text: string;
  response?: string;
  platform: string;
  [key: string]: any;
}

export type Middleware = (ctx: Ictx, next?: Next) => void | Promise<void>;

class Bot {
  use(...fn: Array<Middleware>) {
    this.middlewares.push(...fn);
  }

  getCallback(): (ctx: Ictx) => Promise<void> {
    const fn = compose(this.middlewares);
    const handle = (ctx: Ictx) => fn(ctx);
    return handle;
  }

  middlewares: Array<Middleware> = [];
}

export default Bot;
