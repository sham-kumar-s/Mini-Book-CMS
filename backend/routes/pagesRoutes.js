import express from "express";
import { createPage,updatePage,getVersions,restoreVersion } from "../controllers/pagesControllers.js";

const router = express.Router();

router.post("/:chapterId", createPage);
router.put("/:pageId", updatePage);
router.get("/:pageId/versions", getVersions);
router.post("/:pageId/restore/:versionId", restoreVersion);

export default router; 
