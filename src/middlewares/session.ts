// Этот файл скопирован с node-vk-bot-api/lib/session.js
// Надо бы поправить весть этот ужас
// tslint:disable 

class Session {
  constructor(settings) {
    Object.assign(
      this,
      {
        store: new Map(),
        key: "session",
        getSessionKey: ctx => {
          const userId = ctx.message.peer_id || ctx.message.from_id;

          return `${userId}:${userId}`;
        }
      },
      settings
    );
  }
  // @ts-ignore
  middleware() {
    return (ctx, next) => {
      // @ts-ignore
      const key = this.getSessionKey(ctx);
      // @ts-ignore
      let session = this.store.get(key) || {};
      // @ts-ignore
      Object.defineProperty(ctx, this.key, {
        get: () => session,
        set: value => {
          // @ts-ignore
          session = value;
        }
      });
      // @ts-ignore
      this.store.set(key, session);

      next();
    };
  }
}

// @ts-ignore
const session = new Session();

export default session.middleware();
