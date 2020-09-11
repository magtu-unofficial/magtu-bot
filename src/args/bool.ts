import { boolArg } from "../text";
import { color } from "../lib/bot";

export const parser = (str: string): boolean => {
  if (str.search(/вкл|да|on|true|1/i) !== -1) {
    return true;
  }
  if (str.search(/выкл|нет|off|false|0/i) !== -1) {
    return false;
  }
  throw Error(boolArg.error);
};

export default {
  query: boolArg.query,
  keyboard: [
    [
      { label: boolArg.trueKey, color: color.positive },
      { label: boolArg.falseKey, color: color.negative }
    ]
  ],
  parser
};
