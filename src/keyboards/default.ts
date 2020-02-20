import Ikeyboard, { color } from "../interfaces/keyboard";
import { timetableKey, helpKey, reportKey } from "../text";

const defaultKeyboard: Array<Array<Ikeyboard>> = [
  [
    { label: timetableKey, color: color.primary },
    { label: helpKey, color: color.default }
  ],
  [{ label: reportKey, color: color.default, payload: { command: "ошибка" } }]
];

export default defaultKeyboard;
