import path from "path";
import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";
import { saveVersion } from "../utils/fileStorage.js";

export const createBook = async (req,res) => {
    const { title,description } = req.body;

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