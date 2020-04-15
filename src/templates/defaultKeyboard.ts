import { timetableKey, helpKey } from "../text";

import Ikeyboard, { color } from "../interfaces/keyboard";

const keyboard: Array<Array<Ikeyboard>> = [
  [
    { label: timetableKey, color: color.primary },
    { label: helpKey, color: color.default }
  ]
];

export default keyboard;
