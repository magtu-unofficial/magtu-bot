import Koa from "koa";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

import log from "../utils/log";
import Bot, { Ictx, Ikeyboard, platform } from "./bot";

interface IvkConfig {
  token: string;
  secret: string;
  confirm: string;
  path: string;
}

interface IvkCtx extends Ictx {
  message: any;
  clientInfo: any;
}

const API_VERSION = "5.103";
const API_URL = "https://api.vk.com";
const CHUNK_SIZE = 100;
const CHAT = 2000000000;
const CHAT_MENTION = /\[club\d+?\|.+?\] /;

export const isOurMessage = (body: any) => {
  const msg = body.object.message;
  if (msg.peer_id < CHAT) return true;

  if (msg.text.indexOf("/") === 0 || msg.text.search(CHAT_MENTION) !== -1) {
    msg.text = msg.text.replace("/", "");
    msg.text = msg.text.replace(CHAT_MENTION, "");
    return true;
  }

  return false;
};

class Vk extends Bot {
  constructor(config: IvkConfig) {
    super();
    this.config = config;
  }

  koaMiddleware() {
    this.use(async (ctx, next) => {
      await next();

      this.sendMessage(ctx.chat, ctx.response, ctx.keyboard, {
        oneTime: ctx.isChat
      });
    });

    const callback = this.getCallback();

    const handle = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
      if (
        ctx.method === "POST" &&
        ctx.url === this.config.path &&
        ctx.request.body.secret === this.config.secret
      ) {
        if (ctx.request.body.type === "message_new") {
          try {
            if (isOurMessage(ctx.request.body)) {
              await callback(this.createCtx(ctx.request.body));
            }
            ctx.body = "ok";
          } catch (error) {
            log.error(error);
            throw error;
          }
        } else if (ctx.request.body.type === "confirmation") {
          ctx.body = this.config.confirm;
        }
      }
      await next();
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
      log.error(`[vk] ${res.error.error_msg}`);
      throw Error(res.error.error_msg);
    }
    return res.response;
  }

  async sendMessage(
    chat: string,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    params: any = {}
  ) {
    const buttons = keyboard.map(i =>
      i.map(j => ({
        color: j.color,
        action: {
          type: "text",
          label: j.label
        }
      }))
    );

    await this.api("messages.send", {
      random_id: Date.now(),
      peer_id: chat,
      message,
      keyboard: JSON.stringify({ buttons, one_time: params.oneTime }),
      ...params
    });
  }

  async sendMessages(users: Array<string>, msg: string) {
    for (let i = 0; i < users.length; i += CHUNK_SIZE) {
      const chunk = users.slice(i, i + CHUNK_SIZE).join(",");

      await this.api("messages.send", {
        user_ids: chunk,
        message: msg,
        dont_parse_links: 1,
        random_id: Date.now()
      });
    }
  }

  createCtx = (body: any): IvkCtx => {
    const msg = body.object.message;

    let text: string;

    if (msg.reply_message) {
      text = msg.reply_message.text;
    } else if (msg.fwd_messages && msg.fwd_messages.length > 0) {
      text = msg.fwd_messages[0].text;
    } else {
      text = msg.text;
    }

    return {
      bot: this,
      message: msg,
      clientInfo: body.object.client_info,
      chat: msg.peer_id,
      user: msg.from_id,
      isChat: msg.from_id !== msg.peer_id,
      text,
      platform: platform.vk
    };
  };

  config: IvkConfig;
  sendQueue: Array<any> = [];
}

export default Vk;
