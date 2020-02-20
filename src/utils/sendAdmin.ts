import { adminId } from "./config";

export default async (bot, msg) => {
  await bot.execute("messages.send", {
    peer_id: adminId,
    message: msg,
    dont_parse_links: 1,
    random_id: Date.now()
  });
};
