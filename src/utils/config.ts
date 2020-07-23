import { config } from "dotenv";

config();

export const port = process.env.PORT;

export const vkConfirm = process.env.VK_CONFIRM;
export const vkToken = process.env.VK_TOKEN;
export const vkSecret = process.env.VK_SECRET;
export const vkPath = process.env.VK_PATH;

export const tgToken = process.env.TG_TOKEN;
export const tgUrl = process.env.TG_URL;
export const tgPath = process.env.TG_PATH;

export const viberToken = process.env.VIBER_TOKEN;
export const viberUrl = process.env.VIBER_URL;
export const viberPath = process.env.VIBER_PATH;

export const chatSign = process.env.CHAT_SIGN;
export const mongoUri = process.env.MONGO_URI;
export const adminId = process.env.ADMIN_ID;
export const notifySecret = process.env.NOTIFY_SECRET;
