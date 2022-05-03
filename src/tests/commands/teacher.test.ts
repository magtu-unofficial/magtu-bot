import { Esubgroup } from "../../models/timetable";
import { teacherTemplate } from "../../commands/teacher";

test("должен правильно генерироваться темплейт c emoji", () => {
  expect(
    teacherTemplate(
      [
        {
          teacher: "Кекова А. А.",
          group: "Испк-19-2",
          changed: true,
          classroom: "A404",
          name: "тест",
          number: 1,
          subgroup: Esubgroup.first
        },
        {
          teacher: "Кекова А. А.",
          group: "Испк-19-1",
          name: "тест2",
          number: 3,
          subgroup: Esubgroup.common
        },
        {
          teacher: "Кекова А. А.",
          group: "Испк-19-1",
          number: 4,
          error: true,
          string: "тест3"
        }
      ],
      new Date(2020, 1, 1),
      true
    )
  ).toEqual(`Расписание преподавателя Кекова А. А. на субботу 01.02.2020
1️⃣✏ тест - Испк-19-2(1) 🚪A404
3️⃣ тест2 - Испк-19-1
4️⃣❓ тест3 - Испк-19-1`);
});

test("должен правильно генерироваться темплейт без emoji", () => {
  expect(
    teacherTemplate(
      [
        {
          teacher: "Кекова А. А.",
          group: "Испк-19-2",
          changed: true,
          classroom: "A404",
          name: "тест",
          number: 1,
          subgroup: Esubgroup.first
        },
        {
          teacher: "Кекова А. А.",
          group: "Испк-19-1",
          name: "тест2",
          number: 3,
          subgroup: Esubgroup.common
        },
        {
          teacher: "Кекова А. А.",
          group: "Испк-19-1",
          number: 4,
          error: true,
          string: "тест3"
        }
      ],
      new Date(2020, 1, 1),
      false
    )
  ).toEqual(`Расписание преподавателя Кекова А. А. на субботу 01.02.2020
1. (зам) тест - Испк-19-2(1) 🚪A404
3. тест2 - Испк-19-1
4.❓ тест3 - Испк-19-1`);
});
