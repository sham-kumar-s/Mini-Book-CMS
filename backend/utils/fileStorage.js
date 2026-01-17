import fs from "fs-extra";
import path from "path";

const saveVersion = async (basepath, content, version, editorName = "Anonymous") => {
    await fs.ensureDir(basepath);

    const filePath = path.join(basepath, `v${version}.json`);

    await fs.writeJSON(filePath, {
        content,
        timestamp: Date.now(),
        editorName
    });

    return filePath;

}

const readVersion = async (filePath) => {
    return fs.readJSON(filePath);
}

export { saveVersion, readVersion };
