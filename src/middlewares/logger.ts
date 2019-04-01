export default (ctx: any, next: any) => {
  const { peer_id, text, payload } = ctx.message;
  console.log(`${peer_id}: ${text} - ${payload}`);
  next();
};
