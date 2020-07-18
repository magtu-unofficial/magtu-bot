import { cancelKey, teacherArg } from "../text";
import { color } from "../lib/bot";

export const parser = (str: string): string => {
  const teacher = str
    .toLowerCase()
    .match(/([а-яё]{3,})( ([а-яё])\.? ?([а-яё]))?/i);
  if (teacher && teacher.index === 0) {
    if (teacher[2]) {
      return `${teacher[1]} ${teacher[3]}.${teacher[4]}.`;
    }
    return teacher[1];
  }
  throw Error(teacherArg.error);
};

export default {
  query: teacherArg.query,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
