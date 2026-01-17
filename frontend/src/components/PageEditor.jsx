import { useState } from "react";
import api from "../api/api";


export default function PageEditor({ pageId, setPageId }) {
  const [content, setContent] = useState("");
  const [editorName, setEditorName] = useState("");

  const updatePage = async () => {
    try {
      const res = await api.put(`/pages/${pageId}`, { content, editorName });
      alert(`New Version Created: v${res.data.version}`);
    } catch (error) {
      if (error.response?.status === 404) {
        alert(`Not Found: ${error.response.data.error}`);
      } else {
        alert(`Error: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  return (
    <>
      <h3>Edit Page</h3>
      <input 
        placeholder="Page ID" 
        value={pageId}
        onChange={e => setPageId(e.target.value)} 
      />
      <br />
      <textarea placeholder="Updated Content" onChange={e => setContent(e.target.value)} />
      <br />
      <input placeholder="Editor Name (optional)" onChange={e => setEditorName(e.target.value)} />
      <br />
      <button onClick={updatePage}>Save (New Version)</button>
    </>
  );
}
