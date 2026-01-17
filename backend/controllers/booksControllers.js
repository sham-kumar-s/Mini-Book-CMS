import path from "path";
import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";
import { saveVersion, readVersion } from "../utils/fileStorage.js";

export const createBook = async (req,res) => {
    const { title, description, numberOfPages = 0 } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    const bookId = generateId("Book");
    const indexPath = path.join("storage/books" , bookId , "index");

    await saveVersion(indexPath , "" , 1, "System");
    
    db.data.books.push({
        id:bookId,
        title,
        description,
        indexVersion:1, 
    });

    await db.write();

    // Create initial empty pages if numberOfPages is specified
    const createdPages = [];
    if (numberOfPages > 0) {
        // First create a default chapter for initial pages
        const defaultChapterId = generateId("Chapter");
        db.data.chapters.push({
            id: defaultChapterId,
            bookId,
            title: "Chapter 1"
        });

        // Create the specified number of empty pages
        for (let i = 1; i <= numberOfPages; i++) {
            const pageId = generateId("page");
            const basePath = path.join(
                "storage/books",
                bookId,
                "chapters",
                defaultChapterId,
                "pages",
                pageId
            );

            await saveVersion(basePath, "", 1, "System");

            db.data.pages.push({
                id: pageId,
                chapterId: defaultChapterId,
                title: `Page ${i}`,
                currentVersion: 1
            });

            createdPages.push(pageId);
        }

        await db.write();
    }

    res.json({
        message: "Book created successfully",
        bookId,
        pagesCreated: createdPages.length,
        pageIds: createdPages
    });
}

export const getAllBooks = async (req, res) => {
    await db.read();
    res.json(db.data.books);
}

// Update/Edit Index Page
export const updateIndex = async (req, res) => {
    const { content, editorName } = req.body;
    const { bookId } = req.params;

    const book = db.data.books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: `Book '${bookId}' not found` });
    }

    const indexPath = path.join("storage/books", bookId, "index");
    const newVersion = book.indexVersion + 1;

    await saveVersion(indexPath, content, newVersion, editorName);

    book.indexVersion = newVersion;
    await db.write();

    res.json({ message: "Index updated", version: newVersion });
};

// Get Index Page Content (current version)
export const getIndex = async (req, res) => {
    const { bookId } = req.params;

    const book = db.data.books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: `Book '${bookId}' not found` });
    }

    const indexPath = path.join("storage/books", bookId, "index", `v${book.indexVersion}.json`);
    
    try {
        const indexData = await readVersion(indexPath);
        res.json({ content: indexData.content, version: book.indexVersion });
    } catch (error) {
        res.status(404).json({ error: "Index content not found" });
    }
};

// Get Index Versions List
export const getIndexVersions = async (req, res) => {
    const { bookId } = req.params;

    const book = db.data.books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: `Book '${bookId}' not found` });
    }

    const basePath = path.join("storage/books", bookId, "index");

    const versions = [];
    for (let i = 1; i <= book.indexVersion; i++) {
        try {
            const versionPath = path.join(basePath, `v${i}.json`);
            const versionData = await readVersion(versionPath);
            versions.push({
                version: i,
                filename: `v${i}.json`,
                timestamp: versionData.timestamp,
                editorName: versionData.editorName || "Anonymous"
            });
        } catch (error) {
            // If version file doesn't exist, skip it
            continue;
        }
    }

    res.json(versions);
};

// Restore Index Version
export const restoreIndexVersion = async (req, res) => {
    const { bookId, versionId } = req.params;
    const { editorName } = req.body;

    const book = db.data.books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: `Book '${bookId}' not found` });
    }

    const oldVersionPath = path.join("storage/books", bookId, "index", `v${versionId}.json`);
    
    try {
        const oldContent = await readVersion(oldVersionPath);
        
        const newVersion = book.indexVersion + 1;
        const indexPath = path.join("storage/books", bookId, "index");
        
        await saveVersion(indexPath, oldContent.content, newVersion, editorName);

        book.indexVersion = newVersion;
        await db.write();

        res.json({ message: "Index version restored", newVersion });
    } catch (error) {
        res.status(404).json({ error: `Version ${versionId} not found` });
    }
};