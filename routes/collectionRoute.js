import express from "express";
import collectionController from "../controllers/collectionController";
import { upload } from "../config/multer";
const router = express.Router();

router.get("/", collectionController.getAllCollections);
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  collectionController.createCollection
);
router.get("/:id", collectionController.getCollectionById);
router.patch(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  collectionController.updateCollection
);
router.delete("/delete/:id", collectionController.deleteCollection);

export default router;
