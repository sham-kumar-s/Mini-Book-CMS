import { useState } from "react";
import api from "../api/api";

export default function ChapterForm() {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");

  const createChapter = async () => {
    const res = await api.post(`/chapters/${bookId}`, { title });
    alert(`Chapter Created: ${res.data.chapterId}`);
  };

  return (
    <>
      <h3>Create Chapter</h3>
      <input placeholder="Book ID" onChange={e => setBookId(e.target.value)} />
      <br />
      <input placeholder="Chapter Title" onChange={e => setTitle(e.target.value)} />
      <br />
      <button onClick={createChapter}>Create Chapter</button>
    </>
  );
}
