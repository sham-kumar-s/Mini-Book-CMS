import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";

export const createChapter = async (req,res) => {
    const { title } = req.body;
    const { bookId } = req.params;

    const chapterId = generateId("Chapter");
    db.data.chapters.push({
        id:chapterId,
        bookId,
        title
    });

    await db.write();

    res.json({ message: "Chapter created successfully", chapterId });
}