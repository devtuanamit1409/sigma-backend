import express from "express";
import categoryController from "../controllers/CategoryController";
const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.post("/create", categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.patch("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;
