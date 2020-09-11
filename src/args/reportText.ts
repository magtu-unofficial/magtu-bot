import { reportTextArg, cancelKey } from "../text";
import { color } from "../lib/bot";

const parser = (str: String) => str;

export default {
  ...reportTextArg,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
