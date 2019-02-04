import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { Botact } from "botact";

import { port, confirm, token } from "./utils/config";
import Timetable from "./models/timetable";

const date = new Date("2019-02-04T00:00:00.000Z");

const app = new Koa();
const router = new Router();
const bot = new Botact({
  confirmation: confirm,
  token,
  framework: "koa"
});

bot.on(async msg => {
  if (msg.from_id === msg.peer_id) {
    console.log(msg.from_id, msg.text);
    const tt = await Timetable.findOne({ group: msg.text.toLowerCase(), date });
    let reply = `Расписание для группы ${
      tt.group
    } за ${tt.date.getDate()}.${tt.date.getMonth() + 1}\n`;
    for (const pair of tt.pairs) {
      reply += `${pair.number} ${pair.name} \n`;
      reply += `${pair.teacher} ${pair.classroom} \n`;
    }
    msg.reply(reply);
  }
});

router.post("/", bot.listen);

app.use(bodyParser());
app.use(router.routes());

app.listen(port, () => {
  console.log("Ok");
});
