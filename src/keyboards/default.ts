import Ikeyboard, { color } from "../interfaces/keyboard";
import { timetableKey, helpKey } from "../text";

const defaultKeyboard: Array<Array<Ikeyboard>> = [
  [
    { label: timetableKey, color: color.primary },
    { label: helpKey, color: color.default }
  ]
];

export default defaultKeyboard;
