import express from "express";
import { upload } from "../config/multer";

import infoController from "../controllers/infoController";
const router = express.Router();
router.get("/", infoController.getInfo);
router.put(
  "/",
  upload.fields([
    { name: "firstBanner", maxCount: 1 },
    { name: "secondBanner", maxCount: 1 },
  ]),
  infoController.updateInfo
);

export default router;
