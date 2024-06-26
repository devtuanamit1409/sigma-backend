import express from "express";
import productController from "../controllers/productController";
import { upload } from "../config/multer";
const router = express.Router();

router.get("/", productController.getAllProducts);
router.post(
  "/create",
  upload.array("images", 10),
  productController.createProduct
);
router.get("/get-slug/:slug", productController.getProductBySlug);
router.get("/get/:id", productController.getProductById);
router.patch("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/san-pham-moi", productController.getNewProducts);
router.get("/ban-chay", productController.getBestSelling);
router.get(
  "/get-theo-collection/:slug",
  productController.getProductByCollection
);
router.get("/get-theo-category/:slug", productController.getProductsByCategory);
export default router;
