import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(0);
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
      const res = await api.post("/books", { 
        title, 
        description, 
        numberOfPages: parseInt(numberOfPages) || 0 
      });
      alert(`Book Created: ${res.data.bookId}\nPages Created: ${res.data.pagesCreated}`);
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
      <input 
        type="number" 
        placeholder="Number of Initial Pages (optional)" 
        min="0"
        onChange={e => setNumberOfPages(e.target.value)} 
      />
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
