<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategoriController extends Controller
{
    public function index()
    {
        $kategoris = Kategori::all();
        return response()->json($kategoris);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_kategori' => 'required|max:100|unique:kategori'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kategori = Kategori::create($request->all());
        return response()->json($kategori, 201);
    }

    public function show($id)
    {
        $kategori = Kategori::findOrFail($id);
        return response()->json($kategori);
    }

    public function update(Request $request, $id)
    {
        $kategori = Kategori::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nama_kategori' => 'required|max:100|unique:kategori,nama_kategori,'.$id
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kategori->update($request->all());
        return response()->json($kategori);
    }

    public function destroy($id)
    {
        $kategori = Kategori::findOrFail($id);
        $kategori->delete();
        return response()->json(null, 204);
    }
}
