import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    collectionProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
    gender: { type: String },
    type: {
      type: String,
    },
    scent: { type: String },
    style: String,
    topNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "FragranceNote" }],
    middleNotes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FragranceNote" },
    ],
    baseNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "FragranceNote" }],
    description: { type: String },
    year: { type: Number },
    origin: { type: String },
    discountPercent: { type: Number, default: 0 }, // Trường mới cho phần trăm giảm giá
    sizes: [
      {
        size: { type: String },
        price: { type: Number },
        getDiscountedPrice: {
          type: Number,
          default: function () {
            return (
              this.price -
              (this.price * this.ownerDocument().discountPercent) / 100
            );
          },
        },
      },
    ],
    images: [String],
    instruct: {
      type: String,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
    preserve: String,
    review: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        star: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
        },
        comment: {
          type: String,
        },
        images: [String],
        dateComment: {
          type: Date,
        },
      },
    ],
    bestSelling: {
      type: Boolean,
      default: false,
    },
    new: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
