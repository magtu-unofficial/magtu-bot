import Express from "express";
import bodyParser from "body-parser";
import Bot from "node-vk-bot-api";
import dialogflow from "dialogflow";

import { port, confirm, token } from "./utils/config";
import router from "./router";
import middlewares from "./middlewares";

const sessionClient = new dialogflow.SessionsClient();

const app = Express();
const bot = new Bot({
  confirmation: confirm,
  token
});

middlewares(bot);

bot.on(async msg => {
  const sessionPath = sessionClient.sessionPath(
    "vk-bot-7",
    `vk-${msg.message.from_id}`
  );

  try {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: msg.message.text,
          languageCode: "ru-RU"
        }
      }
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    const answer = await router({
      from: msg.from_id,
      text: msg.message.text,
      intent: result.intent.displayName,
      parameters: result.parameters.fields,
      answer: result.fulfillmentText
    });

    msg.send(answer, [
      [
        {
          payload: '{"button":"1"}',
          label: "Расписание1",
          color: "primary"
        },
        {
          payload: '{"button":"2"}',
          label: "Помощь2",
          color: "default"
        }
      ]
    ]);
  } catch (error) {
    console.log(error);
  }
});

app.use(bodyParser.json());

app.post("/", bot.webhookCallback);

app.listen(port, () => {
  console.log("Ok");
});
