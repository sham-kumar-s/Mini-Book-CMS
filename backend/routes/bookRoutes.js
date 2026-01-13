import express from "express";
import { createBook } from "../controllers/booksControllers.js";

const router = express.Router();

router.post("/", createBook);

export default router;

