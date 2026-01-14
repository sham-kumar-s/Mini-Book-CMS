import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };

  const createBook = async () => {
    try {
      const res = await api.post("/books", { title, description });
      alert(`Book Created: ${res.data.bookId}`);
      fetchBooks(); // Refresh list after creating
    } catch (error) {
      if (error.response?.status === 400) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert(`Error: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  return (
    <>
      <h3>Create Book</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <br />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <br />
      <button onClick={createBook}>Create Book</button>

      <h4 style={{ marginTop: "2rem" }}>Existing Books</h4>
      <ul style={{ textAlign: "left" }}>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> (ID: {book.id})<br />
            <em>{book.description}</em>
          </li>
        ))}
      </ul>
    </>
  );
}
