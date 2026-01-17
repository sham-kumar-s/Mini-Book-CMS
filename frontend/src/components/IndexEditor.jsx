import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function IndexEditor() {
  const [bookId, setBookId] = useState("");
  const [content, setContent] = useState("");
  const [editorName, setEditorName] = useState("");
  const [currentVersion, setCurrentVersion] = useState(null);
  const [versions, setVersions] = useState([]);

  const loadIndex = async () => {
    if (!bookId) {
      alert("Please enter a Book ID");
      return;
    }

    try {
      const res = await api.get(`/books/${bookId}/index`);
      setContent(res.data.content);
      setCurrentVersion(res.data.version);
      alert(`Index loaded (Version ${res.data.version})`);
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const updateIndex = async () => {
    if (!bookId) {
      alert("Please enter a Book ID");
      return;
    }

    try {
      const res = await api.put(`/books/${bookId}/index`, { content, editorName });
      alert(`Index updated! New version: ${res.data.version}`);
      setCurrentVersion(res.data.version);
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const loadVersions = async () => {
    if (!bookId) {
      alert("Please enter a Book ID");
      return;
    }

    try {
      const res = await api.get(`/books/${bookId}/index/versions`);
      setVersions(res.data);
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const restoreVersion = async (versionObj) => {
    if (!bookId) {
      alert("Please enter a Book ID");
      return;
    }

    try {
      const res = await api.post(`/books/${bookId}/index/restore/${versionObj.version}`, { editorName });
      alert(`Version restored! New version: ${res.data.newVersion}`);
      loadIndex(); // Reload current content
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <>
      <h3>Index Page Editor</h3>
      <input
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <br />
      <button onClick={loadIndex}>Load Index</button>
      <button onClick={loadVersions}>Load Versions</button>
      <br />
      <br />

      {currentVersion && (
        <p>
          <strong>Current Version: {currentVersion}</strong>
        </p>
      )}

      <textarea
        placeholder="Index content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{ width: "100%", padding: "10px" }}
      />
      <br />
      <input 
        placeholder="Editor Name" 
        onChange={(e) => setEditorName(e.target.value)} 
      />
      <br />
      <button onClick={updateIndex}>Update Index</button>

      {versions.length > 0 && (
        <>
          <h4 style={{ marginTop: "2rem" }}>Available Versions</h4>
          <ul style={{ textAlign: "left" }}>
            {versions.map((v) => (
              <li key={v.version} style={{ marginBottom: "10px" }}>
                <strong>Version {v.version}</strong><br />
                <em>Date: {formatTimestamp(v.timestamp)}</em><br />
                <em>Editor: {v.editorName}</em><br />
                <button onClick={() => restoreVersion(v)}>
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
