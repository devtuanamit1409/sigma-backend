import express from "express";
import fragranceNoteController from "../controllers/fragranceNoteController";
import { upload } from "../config/multer";
const router = express.Router();

router.get("/", fragranceNoteController.getAllFragranceNotes);
router.post(
	"/create",
	upload.single("image"),
	fragranceNoteController.createFragranceNote
);
router.get("/:id", fragranceNoteController.getFragranceNoteById);
router.patch(
	"/update/:id",
	upload.single("image"),
	fragranceNoteController.updateFragranceNote
);
router.delete("/delete/:id", fragranceNoteController.deleteFragranceNote);

export default router;
