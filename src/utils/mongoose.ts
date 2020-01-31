import mongoose from "mongoose";

import log from "./log";
import { mongoUri } from "./config";

mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    if (err) {
      log.error(err.message);
      process.exit(-1);
    }
  }
);

export default mongoose;
