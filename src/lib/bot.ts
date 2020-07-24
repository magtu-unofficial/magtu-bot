import { Next } from "koa";
import compose from "koa-compose";

export enum platform {
  vk = "vk",
  telegram = "telegram",
  viber = "viber",
  test = "test"
}

export enum color {
  primary = "primary",
  default = "default",
  negative = "negative",
  positive = "positive"
}
export interface Ikeyboard {
  label: string;
  color: color;
}
export interface Ictx {
  chat: string; // id чата или пользователя, куда отвечаем
  user?: string; // конкретный пользователь
  isChat: boolean;
  name?: string;
  text: string;
  response?: string;
  keyboard?: Array<Array<Ikeyboard>>;
  platform: platform;
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
    chat: string,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    params: object
  ): Promise<void>;
  sendMessages?(chat: Array<string>, message: string): Promise<void>;
}

export default Bot;
