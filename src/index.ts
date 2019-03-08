import Express from "express";
import bodyParser from "body-parser";
import Bot from "node-vk-bot-api";
import dialogflow from "dialogflow";

import { port, confirm, token } from "./utils/config";
import router from "./router";

const sessionClient = new dialogflow.SessionsClient();

const app = Express();
const bot = new Bot({
  confirmation: confirm,
  token
});

bot.on(async msg => {
  console.log(`${msg.message.from_id} ${msg.message.text}`);
  const sessionPath = sessionClient.sessionPath(
    "vk-bot-7",
    `vk-${msg.message.from_id}`
  );
  bot.execute("messages.setActivity", {
    user_id: msg.message.from_id,
    type: "typing"
  });

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

    await bot.execute("messages.send", {
      access_token: token,
      user_id: msg.message.from_id,
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
    console.log(error);
  }
});

app.use(bodyParser.json());

app.post("/", bot.webhookCallback);

app.listen(port, () => {
  console.log("Ok");
});
