import mongoose from "mongoose";

import { mongoUri } from "./config";

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

export default mongoose;
