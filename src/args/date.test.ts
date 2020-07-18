import { parser } from "./date";

describe("Дата цифами", () => {
  test("01.23.2019", () => {
    expect(parser("02.03.2019")).toEqual(new Date(2019, 2, 2));
  });

  test("01.23.19", () => {
    expect(parser("02.03.2019")).toEqual(new Date(2019, 2, 2));
  });

  test("01.23", () => {
    expect(parser("02.03", new Date(2018, 1, 1))).toEqual(new Date(2018, 2, 2));
  });
});

describe("Дни недели", () => {
  test("понедельник в понедельник", () => {
    expect(parser("понедельник", new Date(2019, 4, 6))).toEqual(
      new Date(2019, 4, 6)
    );
  });

  test("среда в понедельник", () => {
    expect(parser("среда", new Date(2019, 4, 6))).toEqual(new Date(2019, 4, 8));
  });

  test("понедельник в четверг", () => {
    expect(parser("понедельник", new Date(2019, 4, 9))).toEqual(
      new Date(2019, 4, 13)
    );
  });

  test("среда в пятницу", () => {
    expect(parser("среда", new Date(2019, 4, 10))).toEqual(
      new Date(2019, 4, 15)
    );
  });

  test("воскресенье в воскресенье", () => {
    expect(parser("воскресенье", new Date(2019, 4, 5))).toEqual(
      new Date(2019, 4, 5)
    );
  });

  test("понедельник в воскресенье", () => {
    expect(parser("понедельник", new Date(2019, 4, 5))).toEqual(
      new Date(2019, 4, 6)
    );
  });

  test("воскресенье в понедельник", () => {
    expect(parser("воскресенье", new Date(2019, 4, 6))).toEqual(
      new Date(2019, 4, 12)
    );
  });

  test("среду в пятницу пограничное", () => {
    expect(parser("среду", new Date(2019, 4, 31))).toEqual(
      new Date(2019, 5, 5)
    );
  });
});

describe("Относительные слова", () => {
  test("сегодня", () => {
    expect(parser("сегодня", new Date(2019, 4, 9))).toEqual(
      new Date(2019, 4, 9)
    );
  });

  test("завтра", () => {
    expect(parser("завтра", new Date(2019, 4, 9))).toEqual(
      new Date(2019, 4, 10)
    );
  });

  test("послезавтра", () => {
    expect(parser("послезавтра", new Date(2019, 4, 9))).toEqual(
      new Date(2019, 4, 11)
    );
  });

  test("послезавтра пограничный", () => {
    expect(parser("послезавтра", new Date(2019, 4, 31))).toEqual(
      new Date(2019, 5, 2)
    );
  });

  test("вчера", () => {
    expect(parser("вчера", new Date(2019, 4, 9))).toEqual(new Date(2019, 4, 8));
  });

  test("позавчера", () => {
    expect(parser("позавчера", new Date(2019, 4, 9))).toEqual(
      new Date(2019, 4, 7)
    );
  });

  test("позавчера пограничный", () => {
    expect(parser("позавчера", new Date(2019, 5, 1))).toEqual(
      new Date(2019, 4, 30)
    );
  });
});

describe("Неверные строки", () => {
  test("бред", () => {
    expect(() => {
      parser("бред");
    }).toThrow("Дата введена не верно.");
  });
});

describe("Всё доступное", () => {
  test("Всё доступное", () => {
    expect(parser("Всё доступное")).toEqual("all");
  });

  test("Все", () => {
    expect(parser("все")).toEqual("all");
  });

  test("all", () => {
    expect(parser("all")).toEqual("all");
  });
});
