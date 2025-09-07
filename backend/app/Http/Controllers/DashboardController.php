<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Kategori;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBuku = Buku::count();
        $totalKategori = Kategori::count();
        $totalStok = Buku::sum('stok');

        $bukuPerKategori = Kategori::withCount('buku')->get();

        return response()->json([
            'total_buku' => $totalBuku,
            'total_kategori' => $totalKategori,
            'total_stok' => $totalStok,
            'buku_per_kategori' => $bukuPerKategori
        ]);
    }
}
