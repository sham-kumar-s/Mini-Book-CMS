import { useState } from "react";
import api from "../api/api";

export default function VersionHistory({ pageId }) {
  const [versions, setVersions] = useState([]);

  const loadVersions = async () => {
    if (!pageId) return;
    const res = await api.get(`/pages/${pageId}/versions`);
    setVersions(res.data);
  };

  const restoreVersion = async (version) => {
    const v = version.replace("v", "").replace(".json", "");
    const res = await api.post(`/pages/${pageId}/restore/${v}`);
    alert(`Restored → New Version: v${res.data.newVersion}`);
  };

  return (
    <>
      <h4>Version History</h4>
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
