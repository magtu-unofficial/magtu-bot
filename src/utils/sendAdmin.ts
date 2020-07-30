import fetch from "node-fetch";
import { tgToken, adminId } from "./config";

export default async (msg: String) => {
  const parameters = {
    chat_id: adminId,
    parse_mode: "MarkdownV2",
    text: msg.replace(/[-.+?^$[\](){}\\=!]/g, "\\$&")
  };

  const res = await fetch(
    `https://api.telegram.org/bot${tgToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(parameters)
    }
  );

  await res.json();
};
