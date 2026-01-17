import express from "express";
import { 
    createBook, 
    getAllBooks, 
    updateIndex, 
    getIndex, 
    getIndexVersions, 
    restoreIndexVersion 
} from "../controllers/booksControllers.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", createBook);

// Index page routes
router.get("/:bookId/index", getIndex);
router.put("/:bookId/index", updateIndex);
router.get("/:bookId/index/versions", getIndexVersions);
router.post("/:bookId/index/restore/:versionId", restoreIndexVersion);

export default router;
