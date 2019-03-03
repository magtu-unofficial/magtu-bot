import Router from "./router";

import timetable from "./timetable";
import help from "./help";

const router = new Router();

router.add("timetable", timetable);
router.add("help", help);

export default router.route;
