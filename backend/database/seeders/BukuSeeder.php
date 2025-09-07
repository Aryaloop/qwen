<?php

namespace Database\Seeders;

use App\Models\Buku;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BukuSeeder extends Seeder
{
    public function run(): void
    {
        $bukuData = [
            [
                'judul' => 'Laskar Pelangi',
                'pengarang' => 'Andrea Hirata',
                'tahun' => 2005,
                'kategori_id' => 1,
                'stok' => 10,
                'gambar' => 'laskar_pelangi.jpg'
            ],
            [
                'judul' => 'Bumi Manusia',
                'pengarang' => 'Pramoedya Ananta Toer',
                'tahun' => 1980,
                'kategori_id' => 1,
                'stok' => 8,
                'gambar' => 'bumi_manusia.jpg'
            ],
            [
                'judul' => 'Sapiens: Riwayat Singkat Umat Manusia',
                'pengarang' => 'Yuval Noah Harari',
                'tahun' => 2011,
                'kategori_id' => 3,
                'stok' => 15,
                'gambar' => 'sapiens.jpg'
            ],
            [
                'judul' => 'Sejarah Indonesia Modern',
                'pengarang' => 'M.C. Ricklefs',
                'tahun' => 2001,
                'kategori_id' => 4,
                'stok' => 5,
                'gambar' => 'sejarah_indonesia.jpg'
            ],
            [
                'judul' => 'Clean Code: A Handbook of Agile Software Craftsmanship',
                'pengarang' => 'Robert C. Martin',
                'tahun' => 2008,
                'kategori_id' => 5,
                'stok' => 12,
                'gambar' => 'clean_code.jpg'
            ],
        ];

        foreach ($bukuData as $buku) {
            Buku::create($buku);
        }
    }
}
