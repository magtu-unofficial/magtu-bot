import log from "../utils/log";

export default (ctx: any, next: any) => {
  const { peer_id: peerId, text } = ctx.message;
  log.info(`${peerId}: ${text}`);
  next();
};
