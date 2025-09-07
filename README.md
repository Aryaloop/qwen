# Project: Sistem Manajemen Perpustakaan

## Instruksi untuk Qwen
Tolong buatkan **fullstack project** dengan spesifikasi berikut:

### Framework & Tools
- Backend: Laravel 10
- Frontend: React.js + Vite
- Database: MySQL
- ORM: Eloquent
- UI: TailwindCSS + DaisyUI (atau ShadCN untuk React)
- API: RESTful dengan autentikasi session (hanya 1 admin sebagai aktor)

---

### Struktur Database
Buat migration sesuai tabel berikut:

#### Tabel `admin`
- `id` (INT, PK, AUTO_INCREMENT)
- `username` (VARCHAR 50, UNIQUE)
- `password` (VARCHAR 255)
- `nama` (VARCHAR 100)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Tabel `kategori`
- `id` (INT, PK, AUTO_INCREMENT)
- `nama_kategori` (VARCHAR 100, UNIQUE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Tabel `buku`
- `id` (INT, PK, AUTO_INCREMENT)
- `judul` (VARCHAR 200)
- `pengarang` (VARCHAR 150)
- `tahun` (YEAR)
- `kategori_id` (INT, FK ke `kategori.id`, ON DELETE SET NULL)
- `stok` (INT, default 0)
- `gambar` (VARCHAR 255, untuk simpan nama file/URL gambar)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

### Fitur
1. **Login Admin**
   - Session-based authentication
   - Hanya ada 1 admin yang bisa login
   - Middleware untuk proteksi route `/admin/*`

2. **Manajemen Buku**
   - Tambah, edit, hapus buku
   - Upload gambar (disimpan ke storage/public, path disimpan ke kolom `gambar`)
   - Validasi input form
   - Migration + Seeder untuk data dummy

3. **Dashboard Admin**
   - Tampilkan statistik:
     - Total buku
     - Jumlah kategori
     - Jumlah stok total
   - Grafik ringkas (gunakan Chart.js atau Recharts)

4. **UI/UX**
   - Responsive layout (mobile, tablet, desktop)
   - Sidebar navigation untuk admin
   - Tabel interaktif dengan search + pagination
   - Form input dengan desain cantik
   - Dark mode toggle

5. **API Endpoint**
   - `POST /login`
   - `GET /books`
   - `POST /books`
   - `PUT /books/{id}`
   - `DELETE /books/{id}`
   - Semua endpoint hanya bisa diakses jika login sebagai admin

---

### Output yang diminta
- Struktur folder lengkap (Laravel + React terhubung API)
- Migration + Model untuk `admin`, `kategori`, `buku`
- Controller + Route untuk CRUD
- React components untuk:
  - Login form
  - Dashboard
  - Tabel data buku
  - Form tambah/edit buku dengan upload gambar
- Styling dengan TailwindCSS + komponen cantik
- Seeder untuk data awal (1 admin, beberapa kategori, beberapa buku dengan gambar dummy)

> **Catatan:** Pastikan kode final clean, reusable, dan mengikuti best practice Laravel + React.
