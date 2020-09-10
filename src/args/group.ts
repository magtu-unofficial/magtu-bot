import { cancelKey, groupArg } from "../text";
import { color } from "../lib/bot";
import Timetable from "../models/timetable";

export const normalize = (str: string): string => {
  const group = str.match(/([А-Яа-я]{1,6})[- ]?(\d{2})[- ]?(\d)/i);
  if (group && group.index === 0) {
    return `${group[1]}-${group[2]}-${group[3]}`.toLowerCase();
  }
  throw Error(groupArg.error);
};

const parser = async (str: string): Promise<string> => {
  const normstr = normalize(str);

  const hasGroup = await Timetable.findOne(
    { group: normstr },
    { _id: 1 }
  ).lean();

  if (!hasGroup) {
    throw Error(groupArg.notFound);
  }

  return normstr;
};

export default {
  query: groupArg.query,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
