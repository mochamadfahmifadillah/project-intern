<?php

namespace App\Http\Controllers;

use App\Models\Software;
use App\Models\SoftwareRating;
use Illuminate\Http\Request;

class SoftwareRatingController extends Controller
{
    /**
     * Display rating summary for public software detail.
     *
     * GET /api/software-directory/{software}/ratings
     */
    public function index(Request $request, Software $software)
    {
        if ($software->status !== 'active') {
            return response()->json([
                'message' => 'Software tidak ditemukan.',
            ], 404);
        }

        $ratings = SoftwareRating::where(
            'software_id',
            $software->id
        );

        $count = $ratings->count();

        $average = $count > 0
            ? round($ratings->avg('rating'), 1)
            : 0;

        /*
        |--------------------------------------------------------------------------
        | User Rating
        |--------------------------------------------------------------------------
        |
        | Kalau user sedang login, ambil rating miliknya.
        | Kalau belum login, nilainya null.
        |
        */

        $userRating = null;

        if ($request->user()) {
            $userRating = SoftwareRating::where(
                'software_id',
                $software->id
            )
                ->where(
                    'user_id',
                    $request->user()->id
                )
                ->first();
        }

        return response()->json([
            'message' => 'Rating software berhasil diambil.',
            'data' => [
                'average_rating' => $average,
                'total_ratings' => $count,
                'user_rating' => $userRating
                    ? [
                        'id' => $userRating->id,
                        'rating' => $userRating->rating,
                    ]
                    : null,
            ],
        ]);
    }

    /**
     * Store user's rating.
     *
     * POST /api/software-directory/{software}/ratings
     */
    public function store(
        Request $request,
        Software $software
    ) {
        if ($software->status !== 'active') {
            return response()->json([
                'message' => 'Software tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'rating' => [
                'required',
                'integer',
                'min:1',
                'max:5',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Check Existing Rating
        |--------------------------------------------------------------------------
        */

        $existingRating = SoftwareRating::where(
            'software_id',
            $software->id
        )
            ->where(
                'user_id',
                $request->user()->id
            )
            ->first();

        if ($existingRating) {
            return response()->json([
                'message' => 'Anda sudah memberikan rating untuk software ini.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Create Rating
        |--------------------------------------------------------------------------
        */

        $rating = SoftwareRating::create([
            'software_id' => $software->id,
            'user_id' => $request->user()->id,
            'rating' => $validated['rating'],
        ]);

        return response()->json([
            'message' => 'Rating berhasil ditambahkan.',
            'data' => [
                'id' => $rating->id,
                'software_id' => $rating->software_id,
                'user_id' => $rating->user_id,
                'rating' => $rating->rating,
            ],
        ], 201);
    }

    /**
     * Update user's own rating.
     *
     * PUT /api/software-ratings/{softwareRating}
     */
    public function update(
        Request $request,
        SoftwareRating $softwareRating
    ) {
        /*
        |--------------------------------------------------------------------------
        | Authorization
        |--------------------------------------------------------------------------
        */

        if ($softwareRating->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk mengubah rating ini.',
            ], 403);
        }

        $validated = $request->validate([
            'rating' => [
                'required',
                'integer',
                'min:1',
                'max:5',
            ],
        ]);

        $softwareRating->update([
            'rating' => $validated['rating'],
        ]);

        return response()->json([
            'message' => 'Rating berhasil diperbarui.',
            'data' => [
                'id' => $softwareRating->id,
                'software_id' => $softwareRating->software_id,
                'user_id' => $softwareRating->user_id,
                'rating' => $softwareRating->rating,
            ],
        ]);
    }

    /**
     * Delete user's own rating.
     *
     * DELETE /api/software-ratings/{softwareRating}
     */
    public function destroy(
        Request $request,
        SoftwareRating $softwareRating
    ) {
        /*
        |--------------------------------------------------------------------------
        | Authorization
        |--------------------------------------------------------------------------
        */

        if ($softwareRating->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk menghapus rating ini.',
            ], 403);
        }

        $softwareRating->delete();

        return response()->json([
            'message' => 'Rating berhasil dihapus.',
        ]);
    }
}