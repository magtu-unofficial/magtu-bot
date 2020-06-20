import mongoose from "../utils/mongoose";

const user = new mongoose.Schema({
  id: String,
  notify: Boolean,
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

user.statics.setNotify = async function setNotify(id: number, enable: boolean) {
  const doc = await this.findOneAndUpdate({ id }, { notify: enable });
  if (!doc) {
    const newdoc = new this({ id, notify: enable });
    await newdoc.save();
  }
};

user.statics.getNotifyList = async function getNotifyList() {
  const doc = await this.find({ notify: { $eq: true } }, { id: true });
  return doc.map(u => {
    return u.id;
  });
};

interface IuserDocument extends mongoose.Document {
  id: number;
  data: any;
}

interface IuserModel extends mongoose.Model<IuserDocument> {
  get(id: string): Promise<any>;
  set(id: string, data: any): Promise<void>;
  setNotify(id: number, enable: boolean): Promise<void>;
  getNotifyList(): Promise<Array<number>>;
}

const model: IuserModel = mongoose.model<IuserDocument, IuserModel>(
  "user",
  user
);
export default model;
