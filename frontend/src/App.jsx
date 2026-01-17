import { useState } from "react";
import "./App.css";
import BookForm from "./components/BookForm.jsx";
import ChapterForm from "./components/ChapterForm.jsx";
import PageForm from "./components/PageForm.jsx";
import PageEditor from "./components/PageEditor.jsx";
import IndexEditor from "./components/IndexEditor.jsx";
import VersionHistory from "./components/VersionHistory.jsx";

function App() {
  const [pageId, setPageId] = useState("");

  return (
    <div className="app-container">
      <h2 className="app-title">📘 Mini Book CMS (Simple UI)</h2>

      <div className="section-row">
        <div className="card-container">
          <BookForm />
        </div>
        <div className="card-container">
          <ChapterForm />
        </div>
      </div>

      <div className="section-row">
        <div className="card-container">
          <PageForm />
        </div>
        <div className="card-container">
          <PageEditor pageId={pageId} setPageId={setPageId} />
        </div>
      </div>

      <div className="section-row">
        <div className="card-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <IndexEditor />
        </div>
      </div>

      <div className="version-history-section">
        <VersionHistory pageId={pageId} />
      </div>
    </div>
  );
}

export default App;
