import { cancelKey, teacherArg } from "../text";
import { color } from "../interfaces/keyboard";

export const parser = (str: string): string | undefined => {
  const teacher = str
    .toLowerCase()
    .match(/([а-яё]{3,})( ([а-яё])\.? ?([а-яё]))?/i);
  if (teacher && teacher.index === 0) {
    if (teacher[2]) {
      return `${teacher[1]} ${teacher[3]}.${teacher[4]}.`;
    }
    return teacher[1];
  }
  return undefined;
};

export default {
  ...teacherArg,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
