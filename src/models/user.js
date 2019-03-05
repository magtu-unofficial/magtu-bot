import mongoose from "../utils/mongoose";

const user = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  notify: { type: Boolean }
});

user.statics.genString = async function genString() {
  const res = await this.find({ notify: true });
  const ids = res.map(v => {
    return v.id;
  });

  console.log(res);

  const string = ids.reduce((prev, cur, i) => {
    if (i === 0) {
      return cur;
    }
    return `${prev}, ${cur}`;
  });

  console.log(string);
  return string;
};

export default mongoose.model("user", user);
