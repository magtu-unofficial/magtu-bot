import mongoose from "mongoose";

import { platform as Eplatform } from "../lib/bot";

//

const user = new mongoose.Schema({
  id: String,
  platform: { type: String, enum: Object.values(Eplatform) },
  notify: Boolean,
  data: Object
});

user.statics.get = async function get(id: string, platform: Eplatform) {
  const res = await this.findOne({ id, platform });
  return res && res.data ? res.data : {};
};

user.statics.set = async function set(
  id: string,
  platform: Eplatform,
  data: any
) {
  const doc = await this.findOneAndUpdate({ id, platform }, { data });
  if (!doc) {
    const newdoc = new this({ id, platform, data });
    await newdoc.save();
  }
};

user.statics.setNotify = async function setNotify(
  id: string,
  platform: Eplatform,
  enable: boolean
) {
  const doc = await this.findOneAndUpdate({ id, platform }, { notify: enable });
  if (!doc) {
    const newdoc = new this({ id, platform, notify: enable });
    await newdoc.save();
  }
};

user.statics.getNotifyList = async function getNotifyList(platform: Eplatform) {
  const doc = await this.find(
    { platform, notify: { $eq: true } },
    { id: true }
  );
  return doc.map((u: IuserDocument) => u.id);
};

interface IuserDocument extends mongoose.Document {
  id: string;
  platform: Eplatform;
  data: any;
}

interface IuserModel extends mongoose.Model<IuserDocument> {
  get(id: string, platform: Eplatform): Promise<any>;
  set(id: string, platform: Eplatform, data: any): Promise<void>;
  setNotify(id: string, platform: Eplatform, enable: boolean): Promise<void>;
  getNotifyList(platform: Eplatform): Promise<Array<string>>;
}

const model: IuserModel = mongoose.model<IuserDocument, IuserModel>(
  "user",
  user
);
export default model;
