import { useState } from "react";
import api from "../api/api";

export default function PageForm() {
  const [chapterId, setChapterId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPage = async () => {
    const res = await api.post(`/pages/${chapterId}`, {
      title,
      content
    });
    alert(`Page Created: ${res.data.pageId}`);
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
      <button onClick={createPage}>Create Page</button>
    </>
  );
}
