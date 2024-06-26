import express from "express";
const router = express.Router();
import contactController from "../controllers/contactController";
import { upload } from "../config/multer";

router.post("/", upload.single("image"), contactController.create);
router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContact);

export default router;
