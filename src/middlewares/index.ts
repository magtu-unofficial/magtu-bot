import logger from "./logger";
// import typing from "./typing";
import payload from "./payload";
import session from "./session";
import args from "./args";
// import chat from "./chat";
// import session from "./session";
import cancel from "./cancel";
// import resend from "./resend";
// import anotherDate from "./anotherDate";

// TODO перенести в index
// TODO: Метрики
export const generic = [logger, session, args, cancel];
export const vk = [payload];
