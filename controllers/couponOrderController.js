import CouponOrder from "../models/CouponOrder";

const couponOrderController = {
  createCouponOrder: async (req, res) => {
    try {
      const { code, discount, expiry } = req.body;
      const couponOrder = new CouponOrder({ code, discount, expiry });
      await couponOrder.save();
      res.status(200).json(couponOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAllCouponOrders: async (req, res) => {
    try {
      const couponOrders = await CouponOrder.find();
      res.status(200).json(couponOrders);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  deleteCouponOrder: async (req, res) => {
    try {
      const couponOrder = await CouponOrder.findByIdAndDelete(req.params.id);
      if (!couponOrder) {
        return res.status(404).json({ message: "Coupon order not found" });
      }
      res.status(200).json({ message: "Coupon order deleted" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  //check coupon and expiry
  checkCoupon: async (req, res) => {
    try {
      const { code } = req.body;
      const couponOrder = await CouponOrder.findOne({ code });
      if (!couponOrder) {
        return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
      }
      const currentDate = new Date();
      if (currentDate > couponOrder.expiry) {
        return res.status(400).json({ message: "Mã giảm giá đẫ hết hạn" });
      }
      res.status(200).json(couponOrder);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

export default couponOrderController;
