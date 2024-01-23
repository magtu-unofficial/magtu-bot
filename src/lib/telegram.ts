import Koa from "koa";
import fetch from "node-fetch";

import log from "../utils/log";

import Bot, { Ictx, Ikeyboard, platform } from "./bot";
import { IuserDocument } from "../models/user";
import ArgsCommand from "./argsCommand";
import { getAllAvailableTimetables } from "../commands/timetable";
import { newChanges } from "../text";

interface ItelegtamConfig {
  token: string;
  url: string;
  path: string;
}

interface ItelegtamCtx extends Ictx {
  message: any;
}

const API_URL = "https://api.telegram.org";
const CHUNK_SIZE = 25;

const sendMessageParams = (
  chat: string,
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
    chat_id: chat,
    text: message.replace(/[-.+?^$[\](){}\\!_]/g, "\\$&"),
    disable_web_page_preview: true,
    parse_mode: "MarkdownV2",
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
        try {
          await callback(botCtx);
          ctx.body = sendMessageParams(
            botCtx.user,
            botCtx.response,
            botCtx.keyboard,
            botCtx.params
          );
          ctx.body.method = "sendMessage";
        } catch (error) {
          log.error(error);
          throw error;
        }
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
      log.error(`[tg] flood. Retry afler ${res.retry_after}`);
      throw Error(`Telegram flood. Retry afler ${res.retry_after}`);
    }

    if (!res.ok) {
      log.error(`[tg] ${res.description}`);
      throw Error(res.description);
    }

    return res.response;
  }

  async sendMessage(
    chat: string,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    params = {}
  ) {
    await this.api(
      "sendMessage",
      sendMessageParams(chat, message, keyboard, params)
    );
  }

  async sendMessages(users: Array<IuserDocument>) {
    for (let i = 0; i < users.length; i += CHUNK_SIZE) {
      for (let j = i; j < i + CHUNK_SIZE && j < users.length; j += 1) {
        const resp = await getAllAvailableTimetables(
          users[j].data.args[1],
          users[j].data.args[2],
          users[j].platform
        );

        await this.sendMessage(users[j].id, `${newChanges}\n\n${resp}`, [[]]);
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
      platform: platform.telegram
    };
  };

  config: ItelegtamConfig;
  sendQueue: Array<any> = [];
}

export default Telegram;
