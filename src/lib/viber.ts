import Koa from "koa";
import fetch from "node-fetch";
import crypto from "crypto";

import log from "../utils/log";

import Bot, { Ictx, Ikeyboard, platform } from "./bot";

interface IviberConfig {
  token: string;
  url: string;
  path: string;
}

interface IviberCtx extends Ictx {
  message: any;
}

const BgColors = {
  default: "#dddddd",
  primary: "#323c8d",
  positive: "#4bb34b",
  negative: "#e64646"
};

const TextColors = {
  default: "#111111",
  primary: "#ffffff",
  positive: "#ffffff",
  negative: "#ffffff"
};

const API_URL = "https://chatapi.viber.com";
const CHUNK_SIZE = 300;

class Viber extends Bot {
  constructor(config: IviberConfig) {
    super();
    this.config = config;
  }

  koaMiddleware() {
    this.api("set_webhook", {
      url: this.config.url
    });

    this.api("get_account_info", {}).then(res => {
      this.name = res.name;
    });

    this.use(async (ctx, next) => {
      await next();

      this.sendMessage(ctx.user, ctx.response, ctx.keyboard, ctx.params);
    });

    const callback = this.getCallback();

    const handle = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
      // https://developers.viber.com/docs/api/rest-bot-api/#callbacks
      if (
        ctx.method === "POST" &&
        ctx.path === this.config.path &&
        crypto
          .createHmac("sha256", this.config.token)
          .update(ctx.request.rawBody)
          .digest("hex") === ctx.header["x-viber-content-signature"]
      ) {
        if (ctx.request.body.event === "message") {
          try {
            await callback(this.createCtx(ctx.request.body));
            ctx.body = "ok";
          } catch (error) {
            log.error(error);
            throw error;
          }
        } else if (ctx.request.body.event === "webhook") {
          // При создании вебхука надо ответить 200 OK
          ctx.body = "ok";
          log.info("Viber done");
        }
      }
      await next();
    };

    return handle;
  }

  async api(method: string, parameters: any) {
    const req = await fetch(`${API_URL}/pa/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Viber-Auth-Token": this.config.token
      },
      body: JSON.stringify(parameters)
    });
    const res = await req.json();

    if (res.status !== 0) {
      log.error(`[viber] ${res.status_message}`);
      throw Error(res.status_message);
    }
    return res;
  }

  async sendMessage(
    peer: number | string,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    params = {}
  ) {
    const buttons = [];
    for (const i of keyboard) {
      const cols = 6 / i.length;
      for (const j of i) {
        buttons.push({
          Columns: cols,
          Rows: 1,
          BgColor: BgColors[j.color],
          ActionBody: j.label,
          Text: `<font color='${TextColors[j.color]}'>${j.label}</font>`
        });
      }
    }

    await this.api("send_message", {
      receiver: peer,
      type: "text",
      sender: {
        name: this.name
      },
      text: message,
      keyboard: {
        Type: "keyboard",
        Buttons: buttons
      },
      ...params
    });
  }

  async sendMessages(users: Array<string>, message: string): Promise<void> {
    for (let i = 0; i < users.length; i += CHUNK_SIZE) {
      const chunk = users.slice(i, i + CHUNK_SIZE);

      await this.api("broadcast_message", {
        broadcast_list: chunk,
        type: "text",
        sender: {
          name: this.name
        },
        text: message
      });
    }
  }

  createCtx = (body: any): IviberCtx => {
    return {
      bot: this,
      message: body,
      user: body.sender.id,
      chat: body.sender.id,
      isChat: false, // В вайбере не поддерживаем чаты
      text: body.message.text,
      platform: platform.viber
    };
  };

  config: IviberConfig;
  name: string;
  sendQueue: Array<any> = [];
}

export default Viber;
