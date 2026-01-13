import { createChapter } from "../controllers/chaptersControllers.js";
import express from "express";

const router = express.Router();
router.post("/:bookId", createChapter);

export default router;
