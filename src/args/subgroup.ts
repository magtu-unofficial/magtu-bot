import { Esubgroup } from "../models/timetable";
import { color } from "../lib/bot";
import { subgroupArg, cancelKey } from "../text";

export const parser = (str: string): Esubgroup => {
  const lowStr = str.toLowerCase();
  if (lowStr.search(subgroupArg.firstSubgroupRegexp) === 0) {
    return Esubgroup.first;
  }
  if (lowStr.search(subgroupArg.secondSubgroupRegexp) === 0) {
    return Esubgroup.second;
  }
  throw Error(subgroupArg.error);
};

export default {
  query: subgroupArg.query,
  keyboard: [
    [
      { label: subgroupArg.firstSubgroupKey, color: color.default },
      { label: subgroupArg.secondSubgroupKey, color: color.default }
    ],
    [{ label: cancelKey, color: color.negative }]
  ],
  parser
};
