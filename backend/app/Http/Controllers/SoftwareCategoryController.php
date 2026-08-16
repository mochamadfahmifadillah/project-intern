<?php

namespace App\Http\Controllers;

use App\Models\SoftwareCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SoftwareCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = SoftwareCategory::withCount('softwares')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data kategori software berhasil diambil.',
            'data' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:software_categories,slug'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        // Pastikan slug otomatis juga tidak bentrok
        if (
            SoftwareCategory::where('slug', $validated['slug'])->exists()
        ) {
            return response()->json([
                'message' => 'Slug kategori sudah digunakan.',
                'errors' => [
                    'slug' => ['Slug kategori sudah digunakan.'],
                ],
            ], 422);
        }

        $category = SoftwareCategory::create($validated);

        return response()->json([
            'message' => 'Kategori software berhasil dibuat.',
            'data' => $category,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SoftwareCategory $softwareCategory)
    {
        $softwareCategory->load('softwares');

        return response()->json([
            'message' => 'Detail kategori software berhasil diambil.',
            'data' => $softwareCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        SoftwareCategory $softwareCategory
    ) {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:software_categories,slug,' . $softwareCategory->id,
            ],
            'description' => ['nullable', 'string'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $softwareCategory->update($validated);

        return response()->json([
            'message' => 'Kategori software berhasil diperbarui.',
            'data' => $softwareCategory->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SoftwareCategory $softwareCategory)
    {
        $softwareCategory->delete();

        return response()->json([
            'message' => 'Kategori software berhasil dihapus.',
        ]);
    }
}