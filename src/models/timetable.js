import mongoose from "../utils/mongoose";

const timetable = mongoose.Schema({
  date: { type: Date, required: true },
  group: { type: String, required: true },
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

timetable.index({ date: 1, group: -1 }, { unique: true });

export default mongoose.model("Timetable", timetable);
