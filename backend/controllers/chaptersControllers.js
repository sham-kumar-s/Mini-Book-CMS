import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";

export const createChapter = async (req,res) => {
    const { title, order } = req.body;
    const { bookId } = req.params;

    if (!title) {
        return res.status(400).json({ error: "Chapter title is required" });
    }

    const bookExists = db.data.books.find(b => b.id === bookId);
    if (!bookExists) {
        return res.status(404).json({ error: `Book '${bookId}' not found` });
    }

    // Calculate order if not provided
    let chapterOrder = order;
    if (!chapterOrder) {
        const bookChapters = db.data.chapters.filter(c => c.bookId === bookId);
        chapterOrder = bookChapters.length + 1;
    }

    const chapterId = generateId("Chapter");
    db.data.chapters.push({
        id:chapterId,
        bookId,
        title,
        order: chapterOrder
    });

    await db.write();

    res.json({ message: "Chapter created successfully", chapterId, order: chapterOrder });
}

export const getAllChapters = async (req, res) => {
    await db.read();
    res.json(db.data.chapters);
}