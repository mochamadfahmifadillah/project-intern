<?php

namespace App\Http\Controllers;

use App\Models\BusinessSize;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BusinessSizeController extends Controller
{
    /**
     * Menampilkan semua business size.
     */
    public function index(): JsonResponse
    {
        $businessSizes = BusinessSize::withCount('softwares')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $businessSizes,
        ]);
    }

    /**
     * Menyimpan business size baru.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:business_sizes,name',
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:business_sizes,slug',
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $businessSize = BusinessSize::create($validated);

        return response()->json([
            'message' => 'Business size berhasil dibuat.',
            'data' => $businessSize,
        ], 201);
    }

    /**
     * Menampilkan detail business size.
     */
    public function show(BusinessSize $businessSize): JsonResponse
    {
        $businessSize->load([
            'softwares',
        ]);

        return response()->json([
            'data' => $businessSize,
        ]);
    }

    /**
     * Memperbarui business size.
     */
    public function update(
        Request $request,
        BusinessSize $businessSize
    ): JsonResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('business_sizes', 'name')
                    ->ignore($businessSize->id),
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('business_sizes', 'slug')
                    ->ignore($businessSize->id),
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $businessSize->update($validated);

        return response()->json([
            'message' => 'Business size berhasil diperbarui.',
            'data' => $businessSize->fresh(),
        ]);
    }

    /**
     * Menghapus business size.
     */
    public function destroy(
        BusinessSize $businessSize
    ): JsonResponse {
        $businessSize->softwares()->detach();

        $businessSize->delete();

        return response()->json([
            'message' => 'Business size berhasil dihapus.',
        ]);
    }
}