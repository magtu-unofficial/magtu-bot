import { Ictx, platform } from "../lib/bot";
import args from "./args";

test("должен парсить аргументы", () => {
  const ctx: Ictx = {
    platform: platform.test,
    chat: "1",
    user: "1",
    isChat: false,
    text: "тест раз два три"
  };
  args(ctx, async () => {});
  expect(ctx.args).toEqual(["раз", "два", "три"]);
});

test("должен создавать пустой массив", () => {
  const ctx: Ictx = {
    platform: platform.test,
    chat: "1",
    user: "1",
    isChat: false,
    text: "тест"
  };
  args(ctx, async () => {});
  expect(ctx.args).toEqual([]);
});
