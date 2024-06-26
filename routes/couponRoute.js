import express from "express";
import couponController from "../controllers/couponController";

const router = express.Router();

router.get("/", couponController.getAllCoupons);
router.post("/create", couponController.createCoupon);
router.get("/:id", couponController.getCouponById);
router.patch("/update/:id", couponController.updateCoupon);
router.delete("/delete/:id", couponController.deleteCoupon);

export default router;
