<?php

namespace App\Http\Controllers;

use App\Models\SavedSoftware;
use App\Models\Software;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SavedSoftwareController extends Controller
{
    /**
     * Menampilkan semua software yang disimpan oleh user.
     *
     * GET /api/v1/saved-softwares
     */
    public function index(Request $request): JsonResponse
    {
        $savedSoftwares = SavedSoftware::query()
            ->where('user_id', $request->user()->id)
            ->with([
                'software.category',
                'software.vendor',
            ])
            ->latest()
            ->paginate(12);

        return response()->json([
            'success' => true,
            'message' => 'Saved software berhasil diambil.',
            'data' => $savedSoftwares,
        ]);
    }

    /**
     * Menyimpan software ke shortlist user.
     *
     * POST /api/v1/saved-softwares/{software}
     */
    public function store(
        Request $request,
        Software $software
    ): JsonResponse {
        $savedSoftware = SavedSoftware::firstOrCreate([
            'user_id' => $request->user()->id,
            'software_id' => $software->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Software berhasil disimpan.',
            'data' => $savedSoftware->load([
                'software.category',
                'software.vendor',
            ]),
        ], 201);
    }

    /**
     * Menghapus software dari shortlist user.
     *
     * DELETE /api/v1/saved-softwares/{software}
     */
    public function destroy(
        Request $request,
        Software $software
    ): JsonResponse {
        $deleted = SavedSoftware::query()
            ->where('user_id', $request->user()->id)
            ->where('software_id', $software->id)
            ->delete();

        if ($deleted === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Software tidak ditemukan di saved software.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Software berhasil dihapus dari saved software.',
        ]);
    }

    /**
     * Mengecek apakah software sudah disimpan user.
     *
     * GET /api/v1/saved-softwares/{software}/check
     */
    public function check(
        Request $request,
        Software $software
    ): JsonResponse {
        $isSaved = SavedSoftware::query()
            ->where('user_id', $request->user()->id)
            ->where('software_id', $software->id)
            ->exists();

        return response()->json([
            'success' => true,
            'data' => [
                'is_saved' => $isSaved,
            ],
        ]);
    }
}