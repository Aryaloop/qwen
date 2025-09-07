import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📚 Perpustakaan</h1>

      {books.length > 0 ? (
        <ul className="list-disc pl-6">
          {books.map((book) => (
            <li key={book.id}>
              {book.judul} - {book.pengarang} ({book.tahun})
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada data buku.</p>
      )}
    </div>
  );
}

export default App;
