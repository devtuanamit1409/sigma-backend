import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstBanner: { type: String, required: true },
  subTitle: { type: String, required: true },
  secondBanner: { type: String, required: true },
  description: { type: String, required: true },
  subDescription: { type: String, required: true },
});

const Info = mongoose.model("Info", infoSchema);

export default Info;
