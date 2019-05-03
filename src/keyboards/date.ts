import Ikeyboard, { color } from "../interfaces/keyboard";
import {
  tomorrowKey,
  todayKey,
  yesterdayKey,
  cancelKey,
  anotherDateKey
} from "../text";

const dateKeyboard: Array<Array<Ikeyboard>> = [
  [
    { label: yesterdayKey, color: color.default },
    { label: todayKey, color: color.default },
    { label: tomorrowKey, color: color.default }
  ],
  [
    { label: anotherDateKey, color: color.primary },
    { label: cancelKey, color: color.negative }
  ]
];

export default dateKeyboard;
