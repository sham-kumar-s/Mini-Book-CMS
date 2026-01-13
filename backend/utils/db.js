import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new JSONFile(path.join(__dirname, "..", "db", "db.json"));
const defaultData = { books:[], chapters:[], pages:[] };
const db = new Low(adapter, defaultData);

const initDB = async () => {
    try {
        await db.read();
    } catch (error) {
        // If file doesn't exist or is empty, initialize with default data
        db.data = defaultData;
    }
    db.data ||= defaultData;
    await db.write();
}

export default initDB;
export { db };