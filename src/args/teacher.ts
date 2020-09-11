import { cancelKey, teacherArg, teacherFio } from "../text";
import { color } from "../lib/bot";
import Timetable from "../models/timetable";

const normalize = (str: string): string => {
  const teacher = str
    .toLowerCase()
    .match(/([а-яё]{3,})( ([а-яё])\.? ?([а-яё]))?/);
  if (teacher && teacher.index === 0) {
    if (teacher[2]) {
      return `${teacher[1]} ${teacher[3]}.${teacher[4]}.`;
    }
    return teacher[1];
  }
  throw Error(teacherArg.error);
};

const parser = async (str: string): Promise<string> => {
  const normstr = normalize(str);
  const normRegExp = new RegExp(normstr, "i");

  const teachers = await Timetable.aggregate([
    { $match: { pairs: { $elemMatch: { teacher: normRegExp } } } },
    { $sort: { date: -1 } },
    { $limit: 50 },
    { $unwind: "$pairs" },
    { $project: { teacher: "$pairs.teacher" } },
    { $match: { teacher: normRegExp } },
    { $sortByCount: { $trim: { input: "$teacher" } } },
    { $project: { _id: false, teacher: "$_id" } }
  ]);

  if (teachers.length > 1) {
    throw Error(
      teachers.reduce(
        (suggested, teacher) => `${suggested}\n- ${teacher.teacher}`,
        teacherFio
      )
    );
  }

  return normstr;
};

export default {
  query: teacherArg.query,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
