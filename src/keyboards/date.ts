import Ikeyboard, { color } from "../interfaces/keyboard";
import { tomorrowKey, todayKey, yesterdayKey, cancelKey } from "../text";

const dateKeyboard: Array<Array<Ikeyboard>> = [
  [
    { label: yesterdayKey, color: color.default },
    { label: todayKey, color: color.primary },
    { label: tomorrowKey, color: color.primary }
  ],
  [{ label: cancelKey, color: color.negative }]
];

export default dateKeyboard;
