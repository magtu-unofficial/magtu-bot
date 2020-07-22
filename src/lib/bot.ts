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
  name?: string;
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
  use(...fn: Array<Middleware>) {
    this.middlewares.push(...fn);
  }

  getCallback(): (ctx: Ictx) => Promise<void> {
    const fn = compose(this.middlewares);
    const handle = (ctx: Ictx) => fn(ctx);
    return handle;
  }

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
