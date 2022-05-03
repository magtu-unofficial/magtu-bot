import { Next } from "koa";
import compose from "koa-compose";
import { IuserDocument } from "../models/user";

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
  sendMessages?(chat: Array<IuserDocument>, message: string): Promise<void>;

  groupUsers(users: Array<any>, agrument: number) {
    const students: { [index: string]: [IuserDocument] } = users.reduce(
      (r: { [index: string]: any }, a) => {
        // eslint-disable-next-line no-param-reassign
        r[a.data.args[agrument]] = [...(r[a.data.args[agrument]] || []), a];
        return r;
      },
      {}
    );

    return students;
  }
}

export default Bot;
