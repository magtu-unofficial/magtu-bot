import { config } from "dotenv";

config();

export const port = process.env.PORT;
export const confirm = process.env.CONFIRM;
export const token = process.env.TOKEN;
export const secret = process.env.SECRET;
export const chatSign = process.env.CHAT_SIGN;
export const mongoUri = process.env.MONGO_URI;
