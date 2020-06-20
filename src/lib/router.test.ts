import Router from "./router";

test("должен вызвать нужный middleware", () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();

  const router = new Router();
  router.add(/тест/i, fn1);
  router.add(/аоаоа/i, fn2);

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
