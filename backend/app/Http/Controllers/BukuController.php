<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BukuController extends Controller
{
    public function index()
    {
        $buku = Buku::with('kategori')->paginate(10);
        return response()->json($buku);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|max:200',
            'pengarang' => 'required|max:150',
            'tahun' => 'required|digits:4|integer|min:1900|max:'.(date('Y')+1),
            'kategori_id' => 'required|exists:kategori,id',
            'stok' => 'required|integer|min:0',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('gambar')) {
            $image = $request->file('gambar');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/buku', $imageName);
            $data['gambar'] = $imageName;
        }

        $buku = Buku::create($data);
        return response()->json($buku, 201);
    }

    public function show($id)
    {
        $buku = Buku::with('kategori')->findOrFail($id);
        return response()->json($buku);
    }

    public function update(Request $request, $id)
    {
        $buku = Buku::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'judul' => 'required|max:200',
            'pengarang' => 'required|max:150',
            'tahun' => 'required|digits:4|integer|min:1900|max:'.(date('Y')+1),
            'kategori_id' => 'required|exists:kategori,id',
            'stok' => 'required|integer|min:0',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('gambar')) {
            // Delete old image if exists
            if ($buku->gambar) {
                Storage::delete('public/buku/' . $buku->gambar);
            }

            $image = $request->file('gambar');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/buku', $imageName);
            $data['gambar'] = $imageName;
        }

        $buku->update($data);
        return response()->json($buku);
    }

    public function destroy($id)
    {
        $buku = Buku::findOrFail($id);

        // Delete image if exists
        if ($buku->gambar) {
            Storage::delete('public/buku/' . $buku->gambar);
        }

        $buku->delete();
        return response()->json(null, 204);
    }
}
