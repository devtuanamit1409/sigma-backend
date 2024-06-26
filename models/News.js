import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    describe: { type: String },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
export default News;