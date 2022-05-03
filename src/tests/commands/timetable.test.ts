import { Esubgroup } from "../../models/timetable";
import { timetableTemplate } from "../../commands/timetable";

test("должен правильно генерироваться темплейт", () => {
  expect(
    timetableTemplate(
      new Date(2020, 1, 1),
      "ИСпК-19-2",
      [
        {
          teacher: "Кекова А. А.",
          changed: true,
          classroom: "A404",
          name: "тест",
          number: 1,
          subgroup: Esubgroup.first
        },
        {
          name: "тест2",
          number: 3,
          subgroup: Esubgroup.common
        },
        {
          teacher: "Кекова А. А.",
          number: 4,
          error: true,
          string: "тест3"
        }
      ],
      Esubgroup.first,
      true
    )
  )
    .toEqual(`Расписание для группы ИСпК-19-2 первой подгруппы на субботу 01.02.2020
1️⃣➡️✏ тест 🎓Кекова А. А. 🚪A404
3️⃣ тест2
4️⃣❓ тест3`);
});

test("должен правильно генерироваться темплейт без emoji", () => {
  expect(
    timetableTemplate(
      new Date(2020, 1, 1),
      "ИСпК-19-2",
      [
        {
          teacher: "Кекова А. А.",
          changed: true,
          classroom: "A404",
          name: "тест",
          number: 1,
          subgroup: Esubgroup.first
        },
        {
          name: "тест2",
          number: 3,
          subgroup: Esubgroup.common
        },
        {
          teacher: "Кекова А. А.",
          number: 4,
          error: true,
          string: "тест3"
        },
        {
          number: 5,
          removed: true,
          changed: true
        }
      ],
      Esubgroup.first,
      false
    )
  )
    .toEqual(`Расписание для группы ИСпК-19-2 первой подгруппы на субботу 01.02.2020
1. (зам) тест 🎓Кекова А. А. 🚪A404
3. тест2
4.❓ тест3
5. (зам) Пара отменена ❌`);
});
