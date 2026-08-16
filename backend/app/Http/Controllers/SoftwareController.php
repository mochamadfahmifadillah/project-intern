<?php

namespace App\Http\Controllers;

use App\Models\Software;
use App\Models\SoftwareCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SoftwareController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $softwares = Software::with('category')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data software berhasil diambil.',
            'data' => $softwares,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:software_categories,id',
            ],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:softwares,slug'],
            'description' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'logo' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['status'] = $validated['status'] ?? 'active';

        // Pastikan slug tidak bentrok
        if (Software::where('slug', $validated['slug'])->exists()) {
            return response()->json([
                'message' => 'Slug software sudah digunakan.',
                'errors' => [
                    'slug' => ['Slug software sudah digunakan.'],
                ],
            ], 422);
        }

        $software = Software::create($validated);

        $software->load('category');

        return response()->json([
            'message' => 'Software berhasil dibuat.',
            'data' => $software,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Software $software)
    {
        $software->load('category');

        return response()->json([
            'message' => 'Detail software berhasil diambil.',
            'data' => $software,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Software $software)
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:software_categories,id',
            ],
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:softwares,slug,' . $software->id,
            ],
            'description' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'logo' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $software->update($validated);

        $software->load('category');

        return response()->json([
            'message' => 'Software berhasil diperbarui.',
            'data' => $software->fresh('category'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Software $software)
    {
        $software->delete();

        return response()->json([
            'message' => 'Software berhasil dihapus.',
        ]);
    }
}
