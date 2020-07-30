import {
  timetableKey,
  teacherKey,
  notifyKey,
  helpKey,
  reportKey,
  donateKey
} from "../text";

import { Ikeyboard, color } from "../lib/bot";

const keyboard: Array<Array<Ikeyboard>> = [
  [
    { label: timetableKey, color: color.primary },
    { label: teacherKey, color: color.default }
  ],
  [
    { label: notifyKey, color: color.default },
    { label: helpKey, color: color.default }
  ],
  [
    { label: reportKey, color: color.default },
    { label: donateKey, color: color.default }
  ]
];

export default keyboard;
