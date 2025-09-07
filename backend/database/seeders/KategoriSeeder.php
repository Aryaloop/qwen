<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            ['nama_kategori' => 'Teknologi'],
            ['nama_kategori' => 'Pendidikan'],
            ['nama_kategori' => 'Agama'],
            ['nama_kategori' => 'Kesehatan'],
            ['nama_kategori' => 'Bisnis'],
            ['nama_kategori' => 'Seni'],
        ];

        foreach ($kategoris as $kategori) {
            Kategori::create($kategori);
        }
    }
}
