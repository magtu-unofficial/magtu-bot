import Esubgroup from "../interfaces/subgroup";
import { firstSubgroupRegexp, secondSubgroupRegexp } from "../text";

export default (str: string): Esubgroup | undefined => {
  const lowStr = str.toLowerCase();
  if (lowStr.search(firstSubgroupRegexp) === 0) {
    return Esubgroup.first;
  }
  if (lowStr.search(secondSubgroupRegexp) === 0) {
    return Esubgroup.second;
  }
  return undefined;
};
