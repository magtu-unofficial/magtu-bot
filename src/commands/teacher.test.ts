import Esubgroup from "../interfaces/subgroup";
import { teacherTemplate } from "./teacher";

test("должен правильно генерироваться темплейт", () => {
  expect(
    teacherTemplate(
      [
        {
          group: "Испк-19-2",
          changed: true,
          classroom: "A404",
          name: "тест",
          number: 1,
          subgroup: Esubgroup.first,
          teacher: "Кекова А. А."
        }
      ],
      new Date(2020, 1, 1)
    )
  ).toEqual(`Расписание преподавателя Кекова А. А. на субботу 01.02.2020
1️⃣✏ тест - Испк-19-2 🚪A404`);
});
