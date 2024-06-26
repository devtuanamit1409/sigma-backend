import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true, // Đảm bảo rằng Google ID là duy nhất
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        sizeInfo: {
          size: { type: String },
          price: { type: Number },
          getDiscountedPrice: { type: Number },
        },
      },
    ],
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
