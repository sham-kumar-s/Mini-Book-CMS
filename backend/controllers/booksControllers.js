import path from "path";
import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";
import { saveVersion } from "../utils/fileStorage.js";

export const createBook = async (req,res) => {
    const { title,description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    const bookId = generateId("Book");
    const indexPath = path.join("storage/books" , bookId , "index");

    await saveVersion(indexPath , "" , 1);
    
    db.data.books.push({
        id:bookId,
        title,
        description,
        indexVersion:1, 
    });

    await db.write();

    res.json({message:"Book created successfully",bookId});
}

export const getAllBooks = async (req, res) => {
    await db.read();
    res.json(db.data.books);
}