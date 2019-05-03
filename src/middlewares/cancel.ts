import { cancelKey, canceled } from "../text";

export default (ctx: any, next: any) => {
  if (ctx.message.text === cancelKey) {
    ctx.canceled = true;
    ctx.send(canceled);
  }
  next();
};
