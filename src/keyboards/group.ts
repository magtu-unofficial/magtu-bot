import Ikeyboard, { color } from "../interfaces/keyboard";
import { cancelKey } from "../text";

const groupKeyboard: Array<Array<Ikeyboard>> = [
  [{ label: cancelKey, color: color.negative }]
];

export default groupKeyboard;
