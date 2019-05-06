import Ikeyboard, { color } from "../interfaces/keyboard";
import { cancelKey, firstSubgroupKey, secondSubgroupKey } from "../text";

const subgroupKeyboard: Array<Array<Ikeyboard>> = [
  [
    { label: firstSubgroupKey, color: color.default },
    { label: secondSubgroupKey, color: color.default }
  ],
  [{ label: cancelKey, color: color.negative }]
];

export default subgroupKeyboard;
