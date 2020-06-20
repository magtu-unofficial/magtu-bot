import Koa from "koa";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

import Bot, { Ictx } from "./bot";

interface IvkConfig {
  token: string;
  secret: string;
  confirm: string;
  path: string;
}

interface IvkCtx extends Ictx {
  platform: "vk";
  message: any;
  clientInfo: any;
}

const API_VERSION = "5.103";
const API_URL = "https://api.vk.com";

class Vk extends Bot {
  constructor(config: IvkConfig) {
    super();
    this.config = config;
  }

  koaMiddleware() {
    this.use(async (ctx, next) => {
      await next();
      if (!ctx.response) {
        ctx.response = "Not found";
      }
      this.sendMessage(ctx.chat, ctx.response);
    });

    const callback = this.getCallback();

    const handle = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
      if (
        ctx.method === "POST" &&
        ctx.url === this.config.path &&
        ctx.request.body.secret === this.config.secret
      ) {
        if (ctx.request.body.type === "message_new") {
          // TODO: trycatch
          await callback(this.createCtx(ctx.request.body));
          ctx.body = "ok";
          await next();
        }
      } else {
        await next();
      }
    };

    return handle;
  }

  async api(method: string, parameters: any) {
    const body = new URLSearchParams({
      v: API_VERSION,
      access_token: this.config.token,
      ...parameters
    });

    const req = await fetch(`${API_URL}/method/${method}`, {
      method: "POST",
      body
    });
    const res = await req.json();
    if (res.error) {
      throw Error(res.error.error_msg);
    }
  }

  async sendMessage(peer: number, message: string, params = {}) {
    await this.api("messages.send", {
      random_id: Date.now(),
      peer_id: peer,
      message,
      ...params
    });
  }

  createCtx = (body: any): IvkCtx => {
    const msg = body.object.message;
    return {
      bot: this,
      message: msg,
      clientInfo: body.object.client_info,
      chat: msg.from_id,
      user: msg.peer_id,
      isChat: msg.from_id !== msg.peer_id,
      text: msg.text,
      platform: "vk"
    };
  };

  config: IvkConfig;
  sendQueue: Array<any> = [];
}

export default Vk;
