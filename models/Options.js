import mongoose from "mongoose";
const optionSchema = new mongoose.Schema({
	name: {
		type: String,
	},
});

const Option = mongoose.model("Option", Option);

export default Option;
