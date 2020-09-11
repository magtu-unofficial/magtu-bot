import Command from "./command";
import ArgsCommand from "./argsCommand";
import Router from "./router";
import { Ictx, platform } from "./bot";

test("должен присваисвать id командам", () => {
  const router = new Router(() => {});
  router.add(new Command(/тест/i, () => {}));
  router.add(new Command(/аоаоа/i, () => {}));
  router.middleware();

  expect(router.commands[0].id).toBe(0);
  expect(router.commands[1].id).toBe(1);
});

test("должен вызвать нужный middleware", () => {
  const fn1 = jest.fn(async () => {});
  const fn2 = jest.fn(async () => {});

  const router = new Router(() => {});
  router.add(new Command(/тест/i, fn1));
  router.add(new Command(/аоаоа/i, fn2));
  const middleware = router.middleware();

  middleware(
    {
      platform: platform.test,
      user: "1",
      chat: "1",
      isChat: false,
      text: "тест"
    },
    async () => {}
  );

  middleware(
    {
      platform: platform.test,
      user: "1",
      chat: "1",
      isChat: false,
      text: "тест кек лол"
    },
    async () => {}
  );

  expect(fn1.mock.calls.length).toBe(2);
  expect(fn2.mock.calls.length).toBe(0);
});

test("должен вести диалог", async () => {
  const cb = jest.fn(async () => {});

  const router = new Router(() => {});
  router.add(
    new ArgsCommand(
      /test/i,
      [
        {
          query: "p1",
          parser: (s: string) => {
            const i = parseInt(s, 10);
            if (i < 10) {
              return i;
            }
            throw Error("error1");
          }
        },
        { query: "p2", parser: (s: string) => s.toUpperCase() }
      ],
      cb,
      3
    )
  );
  const middleware = router.middleware();

  const ctx: Ictx = {
    platform: platform.test,
    user: "1",
    chat: "1",
    isChat: false,
    text: "test",
    session: {},
    args: []
  };
  await middleware(ctx, async () => {
    expect(ctx.session.currentCommand).toBe(0);
    expect(ctx.session.currentArg).toBe(0);
    expect(ctx.response).toBe("p1");
  });

  ctx.text = "110";
  await middleware(ctx, async () => {
    expect(ctx.session.currentCommand).toBe(0);
    expect(ctx.session.currentArg).toBe(0);
    expect(ctx.response).toBe("error1");
  });

  ctx.text = "5";
  await middleware(ctx, async () => {
    expect(ctx.session.currentCommand).toBe(0);
    expect(ctx.session.currentArg).toBe(1);
    expect(ctx.response).toBe("p2");
  });

  ctx.text = "one two";
  await middleware(ctx, async () => {
    expect(ctx.session.currentCommand).toBe(-1);
    expect(ctx.session.args[0]).toBe(5);
    expect(ctx.session.args[1]).toBe("ONE TWO");
  });

  expect(cb.mock.calls[0].length).toBeGreaterThan(0);
});
