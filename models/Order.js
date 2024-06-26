import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
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
    total: Number,
    status: {
      type: String,
      enum: ["Chờ thanh toán", "Xử lý đơn", "Vận chuyển", "Đã giao", "Đã hủy"],
      default: "Chờ thanh toán",
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    ward: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
