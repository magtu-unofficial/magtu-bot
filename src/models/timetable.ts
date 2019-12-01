import mongoose from "../utils/mongoose";
import Ipair from "../interfaces/pair";

const timetable = new mongoose.Schema({
  date: { type: Date, required: true },
  group: { type: String, required: true },
  displayName: String,
  pairs: [
    {
      number: { type: Number, required: true },
      name: { type: String, required: true },
      teacher: { type: String },
      classroom: { type: String },
      subgroup: { type: String, enum: ["common", "first", "second"] },
      changed: { type: Boolean },
      removed: { type: Boolean },
      error: { type: Boolean, default: false },
      string: { type: String }
    }
  ]
});

interface ItimetableDocument extends mongoose.Document {
  date: Date;
  group: Array<string>;
  displayName: string;
  pairs: Array<Ipair>;
  error: string;
}

interface ItimetableModel extends mongoose.Model<ItimetableDocument> {}

const model: ItimetableModel = mongoose.model<
  ItimetableDocument,
  ItimetableModel
>("Timetable", timetable);
export default model;
