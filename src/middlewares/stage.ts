import Stage from "node-vk-bot-api/lib/stage";
import scenes from "../scenes";

const stage = new Stage(...scenes);

export default stage.middleware();
