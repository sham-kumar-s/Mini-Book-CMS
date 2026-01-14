import BookForm from "./components/BookForm.jsx";
import ChapterForm from "./components/ChapterForm.jsx";
import PageForm from "./components/PageForm.jsx";
import PageEditor from "./components/PageEditor.jsx";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📘 Mini Book CMS (Simple UI)</h2>

      <hr />
      <BookForm />

      <hr />
      <ChapterForm />

      <hr />
      <PageForm />

      <hr />
      <PageEditor />
    </div>
  );
}

export default App;
