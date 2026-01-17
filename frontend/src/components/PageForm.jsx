import { useState, useEffect } from "react";
import api from "../api/api";

export default function PageForm() {
  const [chapterId, setChapterId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editorName, setEditorName] = useState("");
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const res = await api.get("/pages");
    setPages(res.data);
  };

  const createPage = async () => {
    try {
      const res = await api.post(`/pages/${chapterId}`, {
        title,
        content,
        editorName
      });
      alert(`Page Created: ${res.data.pageId}`);
      fetchPages(); // Refresh list after creating
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
      <h3>Create Page</h3>
      <input placeholder="Chapter ID" onChange={e => setChapterId(e.target.value)} />
      <br />
      <input placeholder="Page Title" onChange={e => setTitle(e.target.value)} />
      <br />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} />
      <br />
      <input placeholder="Editor Name (optional)" onChange={e => setEditorName(e.target.value)} />
      <br />
      <button onClick={createPage}>Create Page</button>

      <h4 style={{ marginTop: "2rem" }}>Existing Pages</h4>
      <ul style={{ textAlign: "left" }}>
        {pages.map(page => (
          <li key={page.id}>
            <strong>{page.title}</strong> (ID: {page.id})<br />
            <em>Chapter ID: {page.chapterId}</em> | Version: v{page.currentVersion}
          </li>
        ))}
      </ul>
    </>
  );
}
