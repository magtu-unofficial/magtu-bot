import { firstSubgroupRegexp, secondSubgroupRegexp } from "../text";

enum Esubgroup {
  first = "first",
  second = "second"
}

export default (str: string): Esubgroup | undefined => {
  const lowStr = str.toLowerCase();
  if (lowStr.search(firstSubgroupRegexp) === 0) {
    return Esubgroup.first;
  }
  if (lowStr.search(secondSubgroupRegexp) === 0) {
    return Esubgroup.second;
  }
};
