import Koa from "koa";
import fetch from "node-fetch";

import log from "../utils/log";

import Bot, { Ictx, Ikeyboard } from "./bot";

interface IviberConfig {
  token: string;
  url: string;
  path: string;
}

interface IviberCtx extends Ictx {
  platform: "viber";
  user: string;
  message: any;
}

const API_URL = "https://chatapi.viber.com";

class Viber extends Bot {
  constructor(config: IviberConfig) {
    super();
    this.config = config;
  }

  koaMiddleware() {
    this.api("set_webhook", {
      url: this.config.url
    });

    this.use(async (ctx, next) => {
      await next();

      this.sendMessage(
        ctx.user,
        ctx.response,
        ctx.keyboard,
        ctx.oneTime,
        ctx.params
      );
    });

    const callback = this.getCallback();

    const handle = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
      // verify sign https://developers.viber.com/docs/api/rest-bot-api/#callbacks
      if (ctx.method === "POST" && ctx.path === this.config.path) {
        if (ctx.request.body.event === "message") {
          await callback(this.createCtx(ctx.request.body));
          ctx.body = "ok";
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

    return res.response;
  }

  async sendMessage(
    peer: number | string,
    message: string,
    keyboard: Array<Array<Ikeyboard>>,
    oneTime = true,
    params = {}
  ) {
    // const buttons = keyboard.map(i =>
    //   i.map(j => ({
    //     color: j.color,
    //     action: {
    //       type: "text",
    //       payload: j.payload ? JSON.stringify(j.payload) : "{}",
    //       label: j.label
    //     }
    //   }))
    // );

    await this.api("send_message", {
      receiver: peer,
      type: "text",
      sender: {
        name: "Расписание МпК  Бот"
      },
      text: message,
      ...params
    });
  }

  // async sendMessages(users: Array<number>, msg: string) {
  //   for (let i = 0; i < users.length; i += CHUNK_SIZE) {
  //     const chunk = users.slice(i, i + CHUNK_SIZE).join(",");

  //     await this.api("messages.send", {
  //       user_ids: chunk,
  //       message: msg,
  //       dont_parse_links: 1,
  //       random_id: Date.now()
  //     });
  //   }
  // }

  createCtx = (body: any): IviberCtx => {
    // let text: string;

    // if (msg.reply_message) {
    //   text = msg.reply_message.text;
    // } else if (msg.fwd_messages && msg.fwd_messages.length > 0) {
    //   text = msg.fwd_messages[0].text;
    // } else {
    //   text = msg.text;
    // }

    return {
      bot: this,
      message: body,
      user: body.sender.id,
      chat: body.sender.id,
      text: body.message.text,
      platform: "viber"
    };
  };

  config: IviberConfig;
  sendQueue: Array<any> = [];
}

export default Viber;
