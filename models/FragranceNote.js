import mongoose from "mongoose";
const fragranceNoteSchema = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String },
});

const FragranceNote = mongoose.model("FragranceNote", fragranceNoteSchema);
export default FragranceNote;
