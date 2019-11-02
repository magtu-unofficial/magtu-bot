import mongoose from "../utils/mongoose";

const user = new mongoose.Schema({
  id: Number,
  data: Object
});

user.statics.get = async function get(id: number) {
  const res = await this.findOne({ id });
  return res && res.data ? res.data : {};
};

user.statics.set = async function set(id: number, data: any) {
  const doc = await this.findOneAndUpdate({ id }, { data });
  if (!doc) {
    const newdoc = new this({ id, data });
    await newdoc.save();
  }
};

interface IuserDocument extends mongoose.Document {
  id: number;
  data: any;
}

interface IuserModel extends mongoose.Model<IuserDocument> {
  get(id: number): Promise<any>;
  set(id: number, data: any): Promise<void>;
}

const model: IuserModel = mongoose.model<IuserDocument, IuserModel>(
  "user",
  user
);
export default model;
