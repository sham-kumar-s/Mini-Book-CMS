import { useState } from "react";
import api from "../api/api.js";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createBook = async () => {
    const res = await api.post("/books", { title, description });
    alert(`Book Created: ${res.data.bookId}`);
  };

  return (
    <>
      <h3>Create Book</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <br />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <br />
      <button onClick={createBook}>Create Book</button>
    </>
  );
}
