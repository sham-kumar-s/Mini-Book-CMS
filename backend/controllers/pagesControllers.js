import path from "path";
import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";
import { saveVersion,readVersion } from "../utils/fileStorage.js";

export const createPage = async (req, res) => {
  const { title, content, editorName } = req.body;
  const { chapterId } = req.params;

  if (!title) {
    return res.status(400).json({ error: "Page title is required" });
  }

  const chapterExists = db.data.chapters.find(c => c.id === chapterId);
  if (!chapterExists) {
    return res.status(404).json({ error: `Chapter '${chapterId}' not found` });
  }

  const pageId = generateId("page");

  const basePath = path.join(
    "storage/books",
    db.data.chapters.find(c => c.id === chapterId).bookId,
    "chapters",
    chapterId,
    "pages",
    pageId
  );

  await saveVersion(basePath, content, 1, editorName);

  db.data.pages.push({
    id: pageId,
    chapterId,
    title,
    currentVersion: 1
  });

  await db.write();
  res.json({ message: "Page created", pageId });
};

export const getAllPages = async (req, res) => {
  await db.read();
  res.json(db.data.pages);
};


export const updatePage = async (req, res) => {
  const { content, editorName } = req.body;
  const { pageId } = req.params;

  const page = db.data.pages.find(p => p.id === pageId);
  
  if (!page) {
    return res.status(404).json({ error: `Page '${pageId}' not found` });
  }
  
  const chapter = db.data.chapters.find(c => c.id === page.chapterId);

  const basePath = path.join(
    "storage/books",
    chapter.bookId,
    "chapters",
    chapter.id,
    "pages",
    pageId
  );

  const newVersion = page.currentVersion + 1;
  await saveVersion(basePath, content, newVersion, editorName);

  page.currentVersion = newVersion;
  await db.write();

  res.json({ message: "Page updated", version: newVersion });
};


export const getVersions = async (req, res) => {
  const { pageId } = req.params;
  const page = db.data.pages.find(p => p.id === pageId);

  if (!page) {
    return res.status(404).json({ error: `Page '${pageId}' not found` });
  }

  const chapter = db.data.chapters.find(c => c.id === page.chapterId);
  const basePath = path.join(
    "storage/books",
    chapter.bookId,
    "chapters",
    chapter.id,
    "pages",
    pageId
  );

  const versions = [];
  for (let i = 1; i <= page.currentVersion; i++) {
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

export const restoreVersion = async (req, res) => {
  const { pageId, versionId } = req.params;
  const { editorName } = req.body;
  const page = db.data.pages.find(p => p.id === pageId);

  if (!page) {
    return res.status(404).json({ error: `Page '${pageId}' not found` });
  }
  const chapter = db.data.chapters.find(c => c.id === page.chapterId);

  const basePath = path.join(
    "storage/books",
    chapter.bookId,
    "chapters",
    chapter.id,
    "pages",
    pageId
  );

  const oldContent = await readVersion(
    path.join(basePath, `v${versionId}.json`)
  );

  const newVersion = page.currentVersion + 1;
  await saveVersion(basePath, oldContent.content, newVersion, editorName);

  page.currentVersion = newVersion;
  await db.write();

  res.json({ message: "Version restored", newVersion });
};