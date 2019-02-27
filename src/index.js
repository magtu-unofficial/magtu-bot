import Koa from "koa";
import KoaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import { Botact } from "botact";
import dialogflow from "dialogflow";

import { port, confirm, token } from "./utils/config";
import router from "./router";

const sessionClient = new dialogflow.SessionsClient();

const app = new Koa();
const koaRouter = new KoaRouter();
const bot = new Botact({
  confirmation: confirm,
  token,
  framework: "koa"
});

bot.on(async msg => {
  if (msg.from_id === msg.peer_id) {
    const sessionPath = sessionClient.sessionPath(
      "vk-bot-7",
      `vk-${msg.from_id}`
    );

    try {
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: msg.text,
            languageCode: "ru-RU"
          }
        }
      };
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      const answer = await router({
        from: msg.from_id,
        text: msg.text,
        intent: result.intent.displayName,
        parameters: result.parameters.fields,
        answer: result.fulfillmentText
      });

      await msg.api("messages.send", {
        peer_id: msg.peer_id,
        message: answer,
        dont_parse_links: 1,
        keyboard: JSON.stringify({
          one_time: false,
          buttons: [
            [
              {
                action: {
                  type: "text",
                  payload: '{"button":"1"}',
                  label: "Расписание"
                },
                color: "primary"
              },
              {
                action: {
                  type: "text",
                  payload: '{"button":"2"}',
                  label: "Помощь"
                },
                color: "default"
              }
            ]
          ]
        })
      });
    } catch (error) {
      console.log(error.message);
    }
  }
});

koaRouter.post("/", bot.listen);

app.use(bodyParser());
app.use(koaRouter.routes());

app.listen(port, () => {
  console.log("Ok");
});
