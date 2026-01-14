import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";

export const createChapter = async (req,res) => {
    const { title } = req.body;
    const { bookId } = req.params;

    if (!title) {
        return res.status(400).json({ error: "Chapter title is required" });
    }

    const bookExists = db.data.books.find(b => b.id === bookId);
    if (!bookExists) {
        return res.status(404).json({ error: `Book '${bookId}' not found` });
    }

    const chapterId = generateId("Chapter");
    db.data.chapters.push({
        id:chapterId,
        bookId,
        title
    });

    await db.write();

    res.json({ message: "Chapter created successfully", chapterId });
}

export const getAllChapters = async (req, res) => {
    await db.read();
    res.json(db.data.chapters);
}