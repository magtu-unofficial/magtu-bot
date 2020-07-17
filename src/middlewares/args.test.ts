import { Ictx } from "../lib/bot";
import args from "./args";

test("должен парсить аргументы", () => {
  const ctx: Ictx = {
    platform: "test",
    user: 1,
    text: "тест раз два три"
  };
  args(ctx, async () => {});
  expect(ctx.args).toEqual(["раз", "два", "три"]);
});

test("должен создавать пустой массив", () => {
  const ctx: Ictx = {
    platform: "test",
    user: 1,
    text: "тест"
  };
  args(ctx, async () => {});
  expect(ctx.args).toEqual([]);
});
