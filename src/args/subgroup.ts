import Esubgroup from "../interfaces/subgroup";
import { color } from "../lib/bot";
import { subgroupArg, cancelKey } from "../text";

export const parser = (str: string): Esubgroup | undefined => {
  const lowStr = str.toLowerCase();
  if (lowStr.search(subgroupArg.firstSubgroupRegexp) === 0) {
    return Esubgroup.first;
  }
  if (lowStr.search(subgroupArg.secondSubgroupRegexp) === 0) {
    return Esubgroup.second;
  }
  return undefined;
};

export default {
  ...subgroupArg,
  keyboard: [
    [
      { label: subgroupArg.firstSubgroupKey, color: color.default },
      { label: subgroupArg.secondSubgroupKey, color: color.default }
    ],
    [{ label: cancelKey, color: color.negative }]
  ],
  parser
};
