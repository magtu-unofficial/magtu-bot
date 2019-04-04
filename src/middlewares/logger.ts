import log from "../utils/log";

export default (ctx: any, next: any) => {
  const { peer_id, text } = ctx.message;
  log.info(`${peer_id}: ${text} - ${ctx.payload} ${ctx.args}`);
  next();
};
