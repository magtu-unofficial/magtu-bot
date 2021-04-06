import { cancelKey, classroomArg } from "../text";
import { color } from "../lib/bot";

const parser = async (str: string): Promise<Array<string>> => {
  const classroom = str
    .toLowerCase()
    .match(/(а|м|у|п|ин|о|б|л|с|зал)[ -]?(\d{1,3})(а|б)?/);
  if (classroom && classroom.index === 0) {
    return [classroom[1], classroom[2], classroom[3]];
  }
  throw Error(classroomArg.error);
};

export default {
  query: classroomArg.query,
  keyboard: [[{ label: cancelKey, color: color.negative }]],
  parser
};
