import Koa from "koa";
import bodyParser from "koa-bodyparser";

import help from "./commands/help";
import notify from "./commands/notify";
import report from "./commands/report";
import teacher from "./commands/teacher";
import timetable from "./commands/timetable";
import { platform } from "./lib/bot";
import Router from "./lib/router";
import Vk from "./lib/vk";
import Telegram from "./lib/telegram";
import Viber from "./lib/viber";
import middlewares from "./middlewares";
import User from "./models/user";
import { cmdNotFound } from "./text";
import {
  vkToken,
  vkSecret,
  vkConfirm,
  vkPath,
  tgToken,
  tgUrl,
  tgPath,
  viberToken,
  viberUrl,
  viberPath,
  port,
  notifySecret
} from "./utils/config";
import log from "./utils/log";
import mongoose from "./utils/mongoose";
import donate from "./commands/donate";
import classroom from "./commands/classroom";
// import sendAdmin from "./utils/sendAdmin";

const app = new Koa();
app.use(bodyParser());

const router = new Router(ctx => {
  ctx.response = cmdNotFound;
  //   sendAdmin(`*NF ${ctx.platform} ${ctx.user}*
  // ${ctx.text}

  // \`\`\`
  // ${JSON.stringify(ctx.message, null, 2)}
  // \`\`\``);
});

router.add(timetable, teacher, classroom, notify, report, help, donate);

middlewares.push(router.middleware());

const vk = new Vk({
  confirm: vkConfirm,
  token: vkToken,
  secret: vkSecret,
  path: vkPath
});
vk.use(...middlewares);
app.use(vk.koaMiddleware());
log.info("VK done");

const telegram = new Telegram({ token: tgToken, url: tgUrl, path: tgPath });
telegram.use(...middlewares);
app.use(telegram.koaMiddleware());

const viber = new Viber({ token: viberToken, url: viberUrl, path: viberPath });
viber.use(...middlewares);
app.use(viber.koaMiddleware());

app.use(async ctx => {
  if (
    ctx.method === "GET" &&
    ctx.path === "/notify" &&
    ctx.query.secret === notifySecret
  ) {
    User.getNotifyList(platform.vk).then(vkList => {
      vk.sendMessages(vkList).then(() => {
        User.getNotifyList(platform.telegram).then(tgList => {
          telegram.sendMessages(tgList).then(() => {
            User.getNotifyList(platform.viber).then(viberList => {
              viber.sendMessages(viberList);
            });
          });
        });
      });
    });

    ctx.body = "ok";
  }
});

app.use(ctx => {
  if (ctx.method === "GET") {
    ctx.body = "Че ты тут забыл?";
  }
});

log.debug(mongoose.version);
app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
