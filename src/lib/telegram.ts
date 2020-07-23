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
const CHUNK_SIZE = 25;

const sendMessageParams = (
  peer: number,
  message: string,
  keyboard: Array<Array<Ikeyboard>>,
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
      one_time_keyboard: false,
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
      url: `${this.config.url}/${this.config.token}`,
      allowed_updates: ["message", "inline_query"]
    }).then(() => {
      log.info("Telegram done");
    });

    const handle = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
      if (
        ctx.method === "POST" &&
        ctx.path === `${this.config.path}/${this.config.token}`
      ) {
        const botCtx = this.createCtx(ctx.request.body);
        await callback(botCtx);
        ctx.body = sendMessageParams(
          botCtx.user,
          botCtx.response,
          botCtx.keyboard,
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

    if (!res.ok) {
      throw Error(res.description);
    }

    return res.response;
  }

  async sendMessage(
    peer: number,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    params = {}
  ) {
    await this.api(
      "sendMessage",
      sendMessageParams(peer, message, keyboard, params)
    );
  }

  async sendMessages(users: Array<number>, message: string) {
    for (let i = 0; i < users.length; i += CHUNK_SIZE) {
      for (let j = i; j < i + CHUNK_SIZE && j < users.length; j += 1) {
        await this.sendMessage(users[j], message, [[]]);
      }
      if (i + CHUNK_SIZE <= users.length) {
        await new Promise(res => setTimeout(res, 2000));
      }
    }
  }

  createCtx = (body: any): ItelegtamCtx => {
    const msg = body.message;

    return {
      bot: this,
      message: msg,
      name: msg.from.username,
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
