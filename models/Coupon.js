import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
			uppercase: true, // Thường được lưu trữ dưới dạng chữ hoa
		},
		discount: {
			type: Number,
			required: true,
			min: 0, // Giảm giá không thể nhỏ hơn 0
		},
		discountType: {
			type: String,
			required: true,
			enum: ["PERCENT", "FLAT"], // Phần trăm giảm giá hoặc giảm giá cố định
		},
		validFrom: {
			type: Date,
			required: true,
		},
		validUntil: {
			type: Date,
			required: true,
		},
		maxUses: {
			type: Number,
			default: 1, // Mặc định mỗi mã giảm giá chỉ sử dụng được một lần
		},
		usedTimes: {
			type: Number,
			default: 0, // Số lần đã sử dụng
		},
		applicableProducts: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Product" },
		], // Các sản phẩm áp dụng
		applicableCategories: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Category" },
		], // Các danh mục áp dụng
		applicableBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }], // Các hãng áp dụng
		stackable: {
			type: Boolean,
			default: false, // Có thể kết hợp với các ưu đãi khác hay không
		},
	},
	{
		timestamps: true, // Tự động tạo các trường createdAt và updatedAt
	}
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
