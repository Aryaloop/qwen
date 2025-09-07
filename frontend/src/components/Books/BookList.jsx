import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import DataTable from '../UI/DataTable';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.pengarang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Cover',
      accessor: 'gambar',
      cell: (value) => (
        <img 
          src={value ? `/storage/buku/${value}` : '/placeholder-book.png'} 
          alt="Book cover" 
          className="w-12 h-16 object-cover rounded"
        />
      )
    },
    {
      header: 'Judul',
      accessor: 'judul'
    },
    {
      header: 'Pengarang',
      accessor: 'pengarang'
    },
    {
      header: 'Tahun',
      accessor: 'tahun'
    },
    {
      header: 'Kategori',
      accessor: 'kategori.nama_kategori'
    },
    {
      header: 'Stok',
      accessor: 'stok'
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (value, row) => (
        <div className="space-x-2">
          <Link
            to={`/books/edit/${value}`}
            className="text-blue-600 hover:text-blue-900"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(value)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Daftar Buku</h1>
        <Link
          to="/books/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Tambah Buku
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Cari buku..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DataTable columns={columns} data={filteredBooks} />
      </div>
    </div>
  );
};

export default BookList;