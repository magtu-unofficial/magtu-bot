import subgroup from "./subgroup";

describe("Проверка подгруппы", () => {
  describe("Первая подгруппа", () => {
    test("Цифрами", () => {
      expect(subgroup("1")).toBe("first");
    });

    test("Буквами", () => {
      expect(subgroup("Первая")).toBe("first");
    });
  });

  describe("Вторая подгруппа", () => {
    test("Цифрами", () => {
      expect(subgroup("2")).toBe("second");
    });

    test("Буквами", () => {
      expect(subgroup("Вторая")).toBe("second");
    });
  });

  describe("Неверная подгруппа", () => {
    test("3", () => {
      expect(subgroup("3")).toBe(undefined);
    });

    test("0", () => {
      expect(subgroup("0")).toBe(undefined);
    });

    test("-1", () => {
      expect(subgroup("-1")).toBe(undefined);
    });

    test("Бред", () => {
      expect(subgroup("Бред")).toBe(undefined);
    });
  });
});
