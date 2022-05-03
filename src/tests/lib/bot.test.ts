import Bot, { platform } from "../../lib/bot";

describe("Базовый класс бота", () => {
  test("Middleware должны выполняться", async () => {
    const statctx = {
      platform: platform.test,
      user: "13245",
      chat: "12345",
      isChat: false,
      text: "test"
    };

    const bot = new Bot();
    const middleware1 = jest.fn(async (ctx, next) => {
      expect(ctx.user).toBe("13245");
      ctx.test = 1;
      await next();
    });
    const middleware2 = jest.fn(ctx => {
      expect(ctx.test).toBe(1);
    });

    bot.use(middleware1, middleware2);

    const cb = bot.getCallback();
    await cb(statctx);

    expect(middleware1.mock.calls.length).toBe(1);
    expect(middleware2.mock.calls.length).toBe(1);
  });
});
