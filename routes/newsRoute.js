import express from "express";
import newController from "../controllers/newController";
import { upload } from "../config/multer";
const router = express.Router();

router.post("/create", upload.single("image"), newController.createNews);
router.get("/", newController.getNews);
router.get("/:id", newController.getNewsById);
router.put("/:id", upload.single("image"), newController.updateNews);
router.delete("/:id", newController.deleteNews);

export default router;
