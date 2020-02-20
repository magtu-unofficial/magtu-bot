import { boolArg } from "../text";
import { color } from "../interfaces/keyboard";

export const parser = (str: string): boolean | undefined => {
  if (str.search(/вкл|да|on|true|1/i) !== -1) {
    return true;
  }
  if (str.search(/выкл|нет|off|false|0/i) !== -1) {
    return false;
  }
  return undefined;
};

export default {
  ...boolArg,
  keyboard: [
    [
      { label: boolArg.trueKey, color: color.positive },
      { label: boolArg.falseKey, color: color.negative }
    ]
  ],
  parser
};
