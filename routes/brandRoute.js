import express from "express";
const router = express.Router();
import brandController from "../controllers/brandController";

router.get("/", brandController.getAllBrands);
router.post("/create", brandController.createBrand);
router.get("/:id", brandController.getBrandById);
router.patch("/update/:id", brandController.updateBrand);
router.delete("/delete/:id", brandController.deleteBrand);

export default router;
