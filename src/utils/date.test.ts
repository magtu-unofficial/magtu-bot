import date from "./date";

describe("Дата цифами", () => {
  test("01.23.2019", () => {
    expect(date("02.03.2019").toISOString()).toBe(
      new Date(2019, 2, 2).toISOString()
    );
  });

  test("01.23", () => {
    expect(date("02.03", new Date(2018, 1, 1)).toISOString()).toBe(
      new Date(2018, 2, 2).toISOString()
    );
  });
});

describe("Дни недели", () => {
  test("понедельник в понедельник", () => {
    expect(date("понедельник", new Date(2019, 4, 6)).toISOString()).toBe(
      new Date(2019, 4, 6).toISOString()
    );
  });

  test("среда в понедельник", () => {
    expect(date("среда", new Date(2019, 4, 6)).toISOString()).toBe(
      new Date(2019, 4, 8).toISOString()
    );
  });

  test("понедельник в четверг", () => {
    expect(date("понедельник", new Date(2019, 4, 9)).toISOString()).toBe(
      new Date(2019, 4, 13).toISOString()
    );
  });

  test("среда в пятницу", () => {
    expect(date("среда", new Date(2019, 4, 10)).toISOString()).toBe(
      new Date(2019, 4, 15).toISOString()
    );
  });

  test("воскресенье в воскресенье", () => {
    expect(date("воскресенье", new Date(2019, 4, 5)).toISOString()).toBe(
      new Date(2019, 4, 5).toISOString()
    );
  });

  test("понедельник в воскресенье", () => {
    expect(date("понедельник", new Date(2019, 4, 5)).toISOString()).toBe(
      new Date(2019, 4, 6).toISOString()
    );
  });

  test("воскресенье в понедельник", () => {
    expect(date("воскресенье", new Date(2019, 4, 6)).toISOString()).toBe(
      new Date(2019, 4, 12).toISOString()
    );
  });

  test("среду в пятницу пограничное", () => {
    expect(date("среду", new Date(2019, 4, 31)).toISOString()).toBe(
      new Date(2019, 5, 5).toISOString()
    );
  });
});

describe("Относительные слова", () => {
  test("сегодня", () => {
    expect(date("сегодня", new Date(2019, 4, 9)).toISOString()).toBe(
      new Date(2019, 4, 9).toISOString()
    );
  });

  test("завтра", () => {
    expect(date("завтра", new Date(2019, 4, 9)).toISOString()).toBe(
      new Date(2019, 4, 10).toISOString()
    );
  });

  test("послезавтра", () => {
    expect(date("послезавтра", new Date(2019, 4, 9)).toISOString()).toBe(
      new Date(2019, 4, 11).toISOString()
    );
  });

  test("послезавтра пограничный", () => {
    expect(date("послезавтра", new Date(2019, 4, 31)).toISOString()).toBe(
      new Date(2019, 5, 2).toISOString()
    );
  });

  test("вчера", () => {
    expect(date("вчера", new Date(2019, 4, 9)).toISOString()).toBe(
      new Date(2019, 4, 8).toISOString()
    );
  });

  test("позавчера", () => {
    expect(date("позавчера", new Date(2019, 4, 9)).toISOString()).toBe(
      new Date(2019, 4, 7).toISOString()
    );
  });

  test("позавчера пограничный", () => {
    expect(date("позавчера", new Date(2019, 5, 1)).toISOString()).toBe(
      new Date(2019, 4, 30).toISOString()
    );
  });
});

describe("Неверные строки", () => {
  test("бред", () => {
    expect(date("бред")).toBe(undefined);
  });
});
