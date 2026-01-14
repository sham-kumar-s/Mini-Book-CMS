import { createChapter, getAllChapters } from "../controllers/chaptersControllers.js";
import express from "express";

const router = express.Router();
router.get("/", getAllChapters);
router.post("/:bookId", createChapter);

export default router;
