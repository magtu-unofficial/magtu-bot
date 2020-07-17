import { cancelKey, groupArg } from "../text";
import { color } from "../lib/bot";

export const parser = (str: string): string | undefined => {
  const group = str.match(/[А-Яа-я]{1,6}-\d{2}-\d/i);
  if (group && group.index === 0) {
    return group[0].toLowerCase();
  }
  return undefined;
};

export default {
  ...groupArg,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
