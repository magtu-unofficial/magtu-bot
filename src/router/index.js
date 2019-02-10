import Router from "./router";

import timetable from "./timetable";

const router = new Router();

router.add("timetable", timetable);

export default router.route;
