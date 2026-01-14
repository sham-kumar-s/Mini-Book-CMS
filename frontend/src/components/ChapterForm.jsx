import { useState, useEffect } from "react";
import api from "../api/api";

export default function ChapterForm() {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    const res = await api.get("/chapters");
    setChapters(res.data);
  };

  const createChapter = async () => {
    try {
      const res = await api.post(`/chapters/${bookId}`, { title });
      alert(`Chapter Created: ${res.data.chapterId}`);
      fetchChapters(); // Refresh list after creating
    } catch (error) {
      if (error.response?.status === 404) {
        alert(`Not Found: ${error.response.data.error}`);
      } else if (error.response?.status === 400) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert(`Error: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  return (
    <>
      <h3>Create Chapter</h3>
      <input placeholder="Book ID" onChange={e => setBookId(e.target.value)} />
      <br />
      <input placeholder="Chapter Title" onChange={e => setTitle(e.target.value)} />
      <br />
      <button onClick={createChapter}>Create Chapter</button>

      <h4 style={{ marginTop: "2rem" }}>Existing Chapters</h4>
      <ul style={{ textAlign: "left" }}>
        {chapters.map(chapter => (
          <li key={chapter.id}>
            <strong>{chapter.title}</strong> (ID: {chapter.id})<br />
            <em>Book ID: {chapter.bookId}</em>
          </li>
        ))}
      </ul>
    </>
  );
}
