import { useState } from "react";
import api from "../api/api";

export default function VersionHistory({ pageId }) {
  const [versions, setVersions] = useState([]);
  const [localPageId, setLocalPageId] = useState("");

  const loadVersions = async () => {
    const idToUse = localPageId || pageId;
    if (!idToUse) {
      alert("Please enter a Page ID");
      return;
    }
    
    try {
      const res = await api.get(`/pages/${idToUse}/versions`);
      setVersions(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        alert(`Not Found: Page '${idToUse}' does not exist`);
      } else {
        alert(`Error: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  const restoreVersion = async (version) => {
    const idToUse = localPageId || pageId;
    const v = version.replace("v", "").replace(".json", "");
    
    try {
      const res = await api.post(`/pages/${idToUse}/restore/${v}`);
      alert(`Restored → New Version: v${res.data.newVersion}`);
    } catch (error) {
      if (error.response?.status === 404) {
        alert(`Not Found: Page '${idToUse}' or version '${v}' does not exist`);
      } else {
        alert(`Error: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  return (
    <>
      <h4>Version History</h4>
      <input 
        placeholder="Enter Page ID" 
        value={localPageId}
        onChange={e => setLocalPageId(e.target.value)} 
      />
      <br />
      <button onClick={loadVersions}>Load Versions</button>

      <ul>
        {versions.map(v => (
          <li key={v}>
            {v}
            <button onClick={() => restoreVersion(v)}>Restore</button>
          </li>
        ))}
      </ul>
    </>
  );
}
