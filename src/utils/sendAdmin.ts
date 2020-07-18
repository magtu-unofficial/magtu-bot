import { adminId } from "./config";
import Vk from "../lib/vk";

// TODO переписать под телегу
export default async (bot: Vk, msg: String) => {
  await bot.api("messages.send", {
    peer_id: adminId,
    message: msg,
    dont_parse_links: 1,
    random_id: Date.now()
  });
};
