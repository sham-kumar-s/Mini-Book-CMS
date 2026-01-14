import { useState } from "react";
import api from "../api/api";
import VersionHistory from "./VersionHistory";

export default function PageEditor() {
  const [pageId, setPageId] = useState("");
  const [content, setContent] = useState("");

  const updatePage = async () => {
    const res = await api.put(`/pages/${pageId}`, { content });
    alert(`New Version Created: v${res.data.version}`);
  };

  return (
    <>
      <h3>Edit Page</h3>
      <input placeholder="Page ID" onChange={e => setPageId(e.target.value)} />
      <br />
      <textarea placeholder="Updated Content" onChange={e => setContent(e.target.value)} />
      <br />
      <button onClick={updatePage}>Save (New Version)</button>

      <VersionHistory pageId={pageId} />
    </>
  );
}
