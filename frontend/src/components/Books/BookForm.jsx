import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    pengarang: '',
    tahun: new Date().getFullYear(),
    kategori_id: '',
    stok: 0,
    gambar: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      const book = response.data;
      setFormData({
        judul: book.judul,
        pengarang: book.pengarang,
        tahun: book.tahun,
        kategori_id: book.kategori_id,
        stok: book.stok,
        gambar: null
      });
      if (book.gambar) {
        setPreviewImage(`/storage/buku/${book.gambar}`);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (id) {
        await api.post(`/books/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/books', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/books');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, gambar: file});
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id ? 'Edit' : 'Tambah'} Buku
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Buku</label>
          <div className="mt-1 flex items-center space-x-4">
            {previewImage && (
              <img src={previewImage} alt="Preview" className="w-20 h-28 object-cover rounded" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {errors.gambar && <p className="mt-1 text-sm text-red-600">{errors.gambar[0]}</p>}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="judul" className="block text-sm font-medium text-gray-700">
            Judul Buku
          </label>
          <input
            type="text"
            id="judul"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.judul}
            onChange={(e) => setFormData({...formData, judul: e.target.value})}
          />
          {errors.judul && <p className="mt-1 text-sm text-red-600">{errors.judul[0]}</p>}
        </div>

        {/* Author */}
        <div>
          <label htmlFor="pengarang" className="block text-sm font-medium text-gray-700">
            Pengarang
          </label>
          <input
            type="text"
            id="pengarang"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.pengarang}
            onChange={(e) => setFormData({...formData, pengarang: e.target.value})}
          />
          {errors.pengarang && <p className="mt-1 text-sm text-red-600">{errors.pengarang[0]}</p>}
        </div>

        {/* Year */}
        <div>
          <label htmlFor="tahun" className="block text-sm font-medium text-gray-700">
            Tahun Terbit
          </label>
          <input
            type="number"
            id="tahun"
            min="1900"
            max={new Date().getFullYear() + 1}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.tahun}
            onChange={(e) => setFormData({...formData, tahun: e.target.value})}
          />
          {errors.tahun && <p className="mt-1 text-sm text-red-600">{errors.tahun[0]}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="kategori_id" className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            id="kategori_id"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.kategori_id}
            onChange={(e) => setFormData({...formData, kategori_id: e.target.value})}
          >
            <option value="">Pilih Kategori</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.nama_kategori}
              </option>
            ))}
          </select>
          {errors.kategori_id && <p className="mt-1 text-sm text-red-600">{errors.kategori_id[0]}</p>}
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stok" className="block text-sm font-medium text-gray-700">
            Stok
          </label>
          <input
            type="number"
            id="stok"
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.stok}
            onChange={(e) => setFormData({...formData, stok: e.target.value})}
          />
          {errors.stok && <p className="mt-1 text-sm text-red-600">{errors.stok[0]}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;