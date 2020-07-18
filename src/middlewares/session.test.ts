import { getSessionKey } from "./session";

test("должен правильно возвращять ключ", () => {
  expect(getSessionKey({ platform: "test", user: 1337, text: "test" })).toBe(
    "test1337"
  );
});
