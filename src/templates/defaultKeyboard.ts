import { timetableKey, teacherKey, notifyKey, helpKey } from "../text";

import Ikeyboard, { color } from "../interfaces/keyboard";

const keyboard: Array<Array<Ikeyboard>> = [
  [
    { label: timetableKey, color: color.primary },
    { label: teacherKey, color: color.default }
  ],
  [
    { label: notifyKey, color: color.default },
    { label: helpKey, color: color.default }
  ]
];

export default keyboard;
