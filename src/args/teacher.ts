import { cancelKey, groupArg } from "../text";
import { color } from "../interfaces/keyboard";

export const parser = (str: string): string | undefined => {
  const teacher = str.match(/[а-яё]{3,} {1,2}[А-ЯЁ][а-яё]?\.[А-ЯЁ]\.?/i);
  if (teacher && teacher.index === 0) {
    return teacher[0].toLowerCase();
  }
  return undefined;
};

export default {
  ...groupArg,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
