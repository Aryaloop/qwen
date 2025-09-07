<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        $kategoris = [
            ['nama_kategori' => 'Fiksi'],
            ['nama_kategori' => 'Non-Fiksi'],
            ['nama_kategori' => 'Sains'],
            ['nama_kategori' => 'Sejarah'],
            ['nama_kategori' => Teknologi']
        ];

        foreach ($kategoris as $kategori) {
            Kategori::create($kategori);
        }
    }
}
