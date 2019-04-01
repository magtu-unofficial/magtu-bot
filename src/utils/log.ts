import winston from "winston";

const log = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ level: true }),
    winston.format.simple()
  )
});

export default log;
