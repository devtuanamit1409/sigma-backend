import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.patch("/update-info/:id", orderController.updateOrderDetails);
router.patch("/:id", orderController.updateOrder);
router.get("/get-order-by-user/:userId", orderController.getOrdersByUser);
router.delete("/:id", orderController.deleteOrder);
router.get("/:id", orderController.getOrderById);

export default router;
