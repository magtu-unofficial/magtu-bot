import { parser } from "./group";

describe("Проверка группы", () => {
  test("Все правильно", () => {
    expect(parser("Испк-18-1")).toBe("испк-18-1");
  });

  test("Пропущенно тире", () => {
    expect(parser("Испк18-1")).toBe("испк-18-1");
  });

  test("Длинное название", () => {
    expect(() => {
      parser("Испкававаывавы-18-1");
    }).toThrow();
  });

  test("Неправильный год", () => {
    expect(() => {
      parser("испк-1-1");
    }).toThrow();
  });

  test("Нет последней цифры", () => {
    expect(() => {
      parser("испк-11");
    }).toThrow();
  });

  test("Последняя цифра очень большая", () => {
    expect(() => {
      parser("испк-11");
    }).toThrow();
  });
});
