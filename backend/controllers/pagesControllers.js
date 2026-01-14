import path from "path";
import { db } from "../utils/db.js";
import generateId from "../utils/idGenerator.js";
import { saveVersion,readVersion } from "../utils/fileStorage.js";

export const createPage = async (req, res) => {
  const { title, content } = req.body;
  const { chapterId } = req.params;

  const pageId = generateId("page");

  const basePath = path.join(
    "storage/books",
    db.data.chapters.find(c => c.id === chapterId).bookId,
    "chapters",
    chapterId,
    "pages",
    pageId
  );

  await saveVersion(basePath, content, 1);

  db.data.pages.push({
    id: pageId,
    chapterId,
    title,
    currentVersion: 1
  });

  await db.write();
  res.json({ message: "Page created", pageId });
};

export const updatePage = async (req, res) => {
  const { content } = req.body;
  const { pageId } = req.params;

  const page = db.data.pages.find(p => p.id === pageId);
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
  await saveVersion(basePath, content, newVersion);

  page.currentVersion = newVersion;
  await db.write();

  res.json({ message: "Page updated", version: newVersion });
};


export const getVersions = async (req, res) => {
  const { pageId } = req.params;
  const page = db.data.pages.find(p => p.id === pageId);

  const versions = [];
  for (let i = 1; i <= page.currentVersion; i++) {
    versions.push(`v${i}.json`);
  }

  res.json(versions);
};

export const restoreVersion = async (req, res) => {
  const { pageId, versionId } = req.params;
  const page = db.data.pages.find(p => p.id === pageId);
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
  await saveVersion(basePath, oldContent.content, newVersion);

  page.currentVersion = newVersion;
  await db.write();

  res.json({ message: "Version restored", newVersion });
};