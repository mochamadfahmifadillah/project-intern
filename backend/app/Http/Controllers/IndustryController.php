<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class IndustryController extends Controller
{
    /**
     * Menampilkan semua industry.
     */
    public function index(): JsonResponse
    {
        $industries = Industry::withCount('softwares')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $industries,
        ]);
    }

    /**
     * Menyimpan industry baru.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:industries,name',
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:industries,slug',
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $industry = Industry::create($validated);

        return response()->json([
            'message' => 'Industry berhasil dibuat.',
            'data' => $industry,
        ], 201);
    }

    /**
     * Menampilkan detail industry.
     */
    public function show(Industry $industry): JsonResponse
    {
        $industry->load([
            'softwares',
        ]);

        return response()->json([
            'data' => $industry,
        ]);
    }

    /**
     * Memperbarui industry.
     */
    public function update(
        Request $request,
        Industry $industry
    ): JsonResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('industries', 'name')
                    ->ignore($industry->id),
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('industries', 'slug')
                    ->ignore($industry->id),
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $industry->update($validated);

        return response()->json([
            'message' => 'Industry berhasil diperbarui.',
            'data' => $industry->fresh(),
        ]);
    }

    /**
     * Menghapus industry.
     */
    public function destroy(Industry $industry): JsonResponse
    {
        $industry->softwares()->detach();

        $industry->delete();

        return response()->json([
            'message' => 'Industry berhasil dihapus.',
        ]);
    }
}