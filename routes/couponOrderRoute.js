import express from "express";
import couponOrderController from "../controllers/couponOrderController";
const router = express.Router();

router.post("/create", couponOrderController.createCouponOrder);
router.get("/", couponOrderController.getAllCouponOrders);
router.delete("/delete/:id", couponOrderController.deleteCouponOrder);
router.post("/check", couponOrderController.checkCoupon);

export default router;
