import mongoose from "mongoose";

const CouponOrderSchema = new mongoose.Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  expiry: { type: Date, required: true },
});

const CouponOrder = mongoose.model("CouponOrder", CouponOrderSchema);
export default CouponOrder;
