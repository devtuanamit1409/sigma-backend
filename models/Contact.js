import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    birthDate: { type: Date },
    email: { type: String },
    title: { type: String },
    content: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
