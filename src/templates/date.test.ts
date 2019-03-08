import date from "./date";

test("Понедельник 25.02.2019", () => {
  expect(date(new Date(2019, 1, 25))).toBe("понедельник 25.02.2019");
});

test("Воскресенье 03.03.2019", () => {
  expect(date(new Date(2019, 2, 3))).toBe("воскресенье 03.03.2019");
});
