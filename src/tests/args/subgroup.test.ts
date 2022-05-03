import { parser } from "../../args/subgroup";

describe("Проверка подгруппы", () => {
  describe("Первая подгруппа", () => {
    test("Цифрами", () => {
      expect(parser("1")).toBe("first");
    });

    test("Буквами", () => {
      expect(parser("Первая")).toBe("first");
    });
  });

  describe("Вторая подгруппа", () => {
    test("Цифрами", () => {
      expect(parser("2")).toBe("second");
    });

    test("Буквами", () => {
      expect(parser("Вторая")).toBe("second");
    });
  });

  describe("Неверная подгруппа", () => {
    test("3", () => {
      expect(() => {
        parser("3");
      }).toThrow();
    });

    test("0", () => {
      expect(() => {
        parser("0");
      }).toThrow();
    });

    test("-1", () => {
      expect(() => {
        parser("-1");
      }).toThrow();
    });

    test("Бред", () => {
      expect(() => {
        parser("Бред");
      }).toThrow();
    });
  });
});
