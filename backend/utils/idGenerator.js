import { db } from "./db.js";

/**
 * Generates a unique ID for books, chapters, or pages
 * Checks the database to ensure no duplicate IDs are created
 * @param {string} type - The type of entity: "Book", "Chapter", or "page"
 * @returns {string} A unique ID in the format: book_001, chapter_001, page_001
 */
const generateId = (type) => {
    const key = type.toLowerCase() + 's'; // Convert to lowercase and pluralize (books, chapters, pages)
    
    // Get all existing IDs from the database for this type
    const existingItems = db.data[key] || [];
    
    // Find the highest existing ID number
    let maxId = 0;
    existingItems.forEach(item => {
        if (item.id) {
            // Extract the number from IDs like "book_001", "chapter_002", etc.
            const match = item.id.match(/_(\d+)$/);
            if (match) {
                const idNumber = parseInt(match[1], 10);
                if (idNumber > maxId) {
                    maxId = idNumber;
                }
            }
        }
    });
    
    // Generate the next unique ID
    const nextId = maxId + 1;
    const id = `${type.toLowerCase()}_${String(nextId).padStart(3, "0")}`;
    
    return id;
}

export default generateId;