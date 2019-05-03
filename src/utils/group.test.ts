import group from "./group";

describe("Проверка группы", () => {
  test("Все правильно", () => {
    expect(group("Испк-18-1")).toBe("испк-18-1");
  });

  test("Пропущенно тире", () => {
    expect(group("Испк18-1")).toBe(undefined);
  });

  test("Длинное название", () => {
    expect(group("Испкававаывавы-18-1")).toBe(undefined);
  });

  test("Неправильный год", () => {
    expect(group("испк-1-1")).toBe(undefined);
  });

  test("Нет последней цифры", () => {
    expect(group("испк-11")).toBe(undefined);
  });

  test("Последняя цифра очень большая", () => {
    expect(group("испк-11")).toBe(undefined);
  });
});
