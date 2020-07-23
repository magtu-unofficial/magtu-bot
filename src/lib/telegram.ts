import Koa from "koa";
import fetch from "node-fetch";

import log from "../utils/log";

import Bot, { Ictx, Ikeyboard } from "./bot";

interface ItelegtamConfig {
  token: string;
  url: string;
  path: string;
}

interface ItelegtamCtx extends Ictx {
  platform: "telegram";
  user: number;
  message: any;
}

const API_URL = "https://api.telegram.org";

const sendMessageParams = (
  peer: number,
  message: string,
  keyboard: Array<Array<Ikeyboard>>,
  oneTime = true,
  params = {}
) => {
  const buttons = keyboard.map(i =>
    i.map(j => ({
      text: j.label
    }))
  );

  return {
    chat_id: peer,
    text: message,
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: oneTime,
      keyboard: buttons
    },
    ...params
  };
};

class Telegram extends Bot {
  constructor(config: ItelegtamConfig) {
    super();
    this.config = config;
  }

  koaMiddleware() {
    const callback = this.getCallback();

    // FIXME добавить токен
    this.api("setWebhook", {
      url: this.config.url,
      allowed_updates: ["message", "inline_query"]
    }).then(() => {
      log.info("Telegram done");
    });

    const handle = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
      if (ctx.method === "POST" && ctx.url === this.config.path) {
        const botCtx = this.createCtx(ctx.request.body);
        await callback(botCtx);
        ctx.body = sendMessageParams(
          botCtx.user,
          botCtx.response,
          botCtx.keyboard,
          botCtx.oneTime,
          botCtx.params
        );
        ctx.body.method = "sendMessage";
      }
      await next();
    };

    return handle;
  }

  async api(method: string, parameters: any) {
    const req = await fetch(`${API_URL}/bot${this.config.token}/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(parameters)
    });
    const res = await req.json();
    if (res.retry_after) {
      throw Error(`Telegram flood. Retry afler ${res.retry_after}`);
    }
    return res.response;
  }

  async sendMessage(
    peer: number,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    oneTime = true,
    params = {}
  ) {
    await this.api(
      "sendMessage",
      sendMessageParams(peer, message, keyboard, oneTime, params)
    );
  }

  // TODO
  // async sendMessages(users: Array<number>, msg: string) {
  //   // for (let i = 0; i < users.length; i += CHUNK_SIZE) {
  //   //   const chunk = users.slice(i, i + CHUNK_SIZE).join(",");
  //   //   await this.api("messages.send", {
  //   //     user_ids: chunk,
  //   //     message: msg,
  //   //     dont_parse_links: 1,
  //   //     random_id: Date.now()
  //   //   });
  //   // }
  // }

  createCtx = (body: any): ItelegtamCtx => {
    const msg = body.message;

    return {
      bot: this,
      message: msg,
      chat: msg.chat.id,
      user: msg.from.id,
      isChat: false,
      text: msg.text,
      platform: "telegram"
    };
  };

  config: ItelegtamConfig;
  sendQueue: Array<any> = [];
}

export default Telegram;
