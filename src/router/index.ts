import Router from "./router";

import timetable from "./timetable";
import help from "./help";

const router = new Router({
  timetable,
  help
});

export default router.route;
