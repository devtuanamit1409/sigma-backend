import Coupon from "../models/Coupon";

const couponController = {
	// Tạo mã giảm giá mới
	createCoupon: async (req, res) => {
		try {
			const coupon = await Coupon.create(req.body);
			res.status(201).json(coupon);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	// Lấy tất cả các mã giảm giá
	getAllCoupons: async (req, res) => {
		try {
			const coupons = await Coupon.find();
			res.status(200).json(coupons);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// Lấy mã giảm giá bằng ID
	getCouponById: async (req, res) => {
		try {
			const coupon = await Coupon.findById(req.params.id);
			if (!coupon) {
				return res.status(404).json({ message: "Coupon not found" });
			}
			res.status(200).json(coupon);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	},

	// Cập nhật mã giảm giá
	updateCoupon: async (req, res) => {
		try {
			const updatedCoupon = await Coupon.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
			if (!updatedCoupon) {
				return res.status(404).json({ message: "Coupon not found" });
			}
			res.status(200).json(updatedCoupon);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},

	// Xóa mã giảm giá
	deleteCoupon: async (req, res) => {
		try {
			const coupon = await Coupon.findByIdAndDelete(req.params.id);
			if (!coupon) {
				return res.status(404).json({ message: "Coupon not found" });
			}
			res.status(200).json({ message: "Coupon deleted successfully" });
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	},
};

export default couponController;
