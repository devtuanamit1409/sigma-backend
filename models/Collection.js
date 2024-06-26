import mongoose from "mongoose";

const colletionSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  banner: {
    type: String,
  },
});
const Collection = mongoose.model("Collection", colletionSchema);
export default Collection;
