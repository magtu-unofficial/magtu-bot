import { cancelKey, groupArg } from "../text";
import { color } from "../lib/bot";

export const parser = (str: string): string => {
  const group = str.match(/[А-Яа-я]{1,6}-\d{2}-\d/i);
  if (group && group.index === 0) {
    return group[0].toLowerCase();
  }
  throw Error(groupArg.error);
};

export default {
  query: groupArg.query,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
