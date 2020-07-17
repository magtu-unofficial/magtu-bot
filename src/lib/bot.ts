import { Next } from "koa";
import compose from "koa-compose";

export enum color {
  primary = "primary",
  default = "default",
  negative = "negative",
  positive = "positive"
}
export interface Ikeyboard {
  payload?: object;
  label: string;
  color: color;
}
export interface Ictx {
  chat?: number;
  user: number;
  isChat?: boolean;
  text: string;
  response?: string;
  keyboard?: Array<Array<Ikeyboard>>;
  oneTime?: boolean;
  platform: string;
  [key: string]: any;
}

export type Middleware = (ctx: Ictx, next?: Next) => void | Promise<void>;

class Bot {
  setDefault(response: string, keyboard) {
    this.defaultResponse = response;
    this.defaultKeyboard = keyboard;
  }

  use(...fn: Array<Middleware>) {
    this.middlewares.push(...fn);
  }

  getCallback(): (ctx: Ictx) => Promise<void> {
    this.use(async (ctx, next) => {
      await next();

      this.sendMessage(
        ctx.chat,
        ctx.response || this.defaultResponse,
        ctx.keyboard || this.defaultKeyboard,
        ctx.oneTime || false,
        ctx.params || {}
      );
    });

    const fn = compose(this.middlewares);
    const handle = (ctx: Ictx) => fn(ctx);
    return handle;
  }

  defaultResponse: string = "Error";
  defaultKeyboard: Array<Array<Ikeyboard>> = [[]];

  middlewares: Array<Middleware> = [];
  sendMessage?(
    peer: number,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    oneTime: boolean,
    params: object
  ): Promise<void>;
}

export default Bot;
