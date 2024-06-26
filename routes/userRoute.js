import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// Route để tạo user
router.post("/create", userController.createUser);

// Route để lấy tất cả users
router.get("/", userController.getAllUsers);

// Route để lấy user bằng ID
router.get("/:id", userController.getUserById);

// Route để cập nhật user
router.patch("/update/:id", userController.updateUser);

// Route để xóa user
router.delete("/delete/:id", userController.deleteUser);

// Route để đăng nhập user và trả về token
router.post("/login", userController.loginUser);

router.post("/addtocart", userController.addToCart);

router.post("/addfavorites", userController.addToFavorites);

router.post("/createOrder", userController.createOrderFromCart);

router.post("/deleteCart", userController.removeFromCart);

router.post("/deleteCartQuantity", userController.removeQuantityFromCart);

export default router;
