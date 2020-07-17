import Command from "./command";
import Router from "./router";

test("должен вызвать нужный middleware", () => {
  const fn1 = jest.fn(async () => {});
  const fn2 = jest.fn(async () => {});

  const router = new Router(() => {});
  router.add(new Command(/тест/i, fn1));
  router.add(new Command(/аоаоа/i, fn2));

  router.middleware(
    { platform: "test", user: 1, text: "тест" },
    async () => {}
  );

  router.middleware(
    { platform: "test", user: 1, text: "тест кек лол" },
    async () => {}
  );

  expect(fn1.mock.calls.length).toBe(2);
  expect(fn2.mock.calls.length).toBe(0);
});
