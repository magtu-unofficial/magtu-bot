import { parser } from "./group";

describe("Проверка группы", () => {
  test("Все правильно", () => {
    expect(parser("Испк-18-1")).toBe("испк-18-1");
  });

  test("Пропущенно тире", () => {
    expect(parser("Испк18-1")).toBe(undefined);
  });

  test("Длинное название", () => {
    expect(parser("Испкававаывавы-18-1")).toBe(undefined);
  });

  test("Неправильный год", () => {
    expect(parser("испк-1-1")).toBe(undefined);
  });

  test("Нет последней цифры", () => {
    expect(parser("испк-11")).toBe(undefined);
  });

  test("Последняя цифра очень большая", () => {
    expect(parser("испк-11")).toBe(undefined);
  });
});
