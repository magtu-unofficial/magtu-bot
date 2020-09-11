import mongoose from "mongoose";

export interface Ipair {
  number?: number;
  name?: string;
  teacher?: string;
  classroom?: string;
  subgroup?: Esubgroup;
  string?: string;
  changed?: boolean;
  removed?: boolean;
  error?: boolean;
}

export interface Itpair extends Ipair {
  group: string;
}

export enum Esubgroup {
  first = "first",
  second = "second",
  common = "common"
}

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
