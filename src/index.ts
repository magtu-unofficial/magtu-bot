import Express from "express";
import bodyParser from "body-parser";
import Bot from "node-vk-bot-api";
import dialogflow from "dialogflow";

import { port, confirm, token, secret } from "./utils/config";
import router from "./router";
import middlewares from "./middlewares";
import log from "./utils/log";

const sessionClient = new dialogflow.SessionsClient();

const app = Express();
const bot = new Bot({
  confirmation: confirm,
  token,
  secret
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
      from: msg.peer_id,
      text: msg.message.text,
      intent: result.intent.displayName,
      parameters: result.parameters.fields,
      answer: result.fulfillmentText
    });

    msg.send(answer, [
      [
        {
          payload: { button: "1" },
          label: "Расписание",
          color: "primary"
        },
        {
          payload: { button: "2" },
          label: "Помощь",
          color: "default"
        }
      ]
    ]);
  } catch (error) {
    log.warn(error.message);
  }
});

app.use(bodyParser.json());

app.post("/", bot.webhookCallback);

app.listen(port, () => {
  log.info(`Бот запущен на порту ${port}`);
});
