import winston from "winston";
import Transport from "winston-transport";
import sendAdmin from "./sendAdmin";

class Telegram extends Transport {
  log(info: any, next: () => void) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    sendAdmin(info.message).then(next);
  }
}

const log = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new Telegram({ level: "warn" })
  ],
  format: winston.format.combine(
    winston.format.colorize({ level: true }),
    winston.format.simple()
  )
});

export default log;
