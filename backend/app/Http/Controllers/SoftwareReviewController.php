<?php

namespace App\Http\Controllers;

use App\Models\Software;
use App\Models\SoftwareReview;
use Illuminate\Http\Request;

class SoftwareReviewController extends Controller
{
    /**
     * Display reviews for public software detail.
     *
     * GET /api/software-directory/{software}/reviews
     */
    public function index(Software $software)
    {
        $reviews = SoftwareReview::with([
            'user:id,name',
        ])
            ->where('software_id', $software->id)
            ->where('status', 'active')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Review software berhasil diambil.',
            'data' => $reviews,
        ]);
    }

    /**
     * Store a newly created review.
     *
     * POST /api/software-directory/{software}/reviews
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
            'review' => [
                'required',
                'string',
                'min:10',
                'max:2000',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Check Existing Review
        |--------------------------------------------------------------------------
        */

        $existingReview = SoftwareReview::where(
            'software_id',
            $software->id
        )
            ->where(
                'user_id',
                $request->user()->id
            )
            ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'Anda sudah memberikan review untuk software ini.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Create Review
        |--------------------------------------------------------------------------
        */

        $review = SoftwareReview::create([
            'software_id' => $software->id,
            'user_id' => $request->user()->id,
            'review' => $validated['review'],
            'status' => 'active',
        ]);

        $review->load('user:id,name');

        return response()->json([
            'message' => 'Review berhasil ditambahkan.',
            'data' => $review,
        ], 201);
    }

    /**
     * Update user's own review.
     *
     * PUT /api/software-reviews/{softwareReview}
     */
    public function update(
        Request $request,
        SoftwareReview $softwareReview
    ) {
        /*
        |--------------------------------------------------------------------------
        | Authorization
        |--------------------------------------------------------------------------
        */

        if ($softwareReview->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk mengubah review ini.',
            ], 403);
        }

        $validated = $request->validate([
            'review' => [
                'required',
                'string',
                'min:10',
                'max:2000',
            ],
        ]);

        $softwareReview->update([
            'review' => $validated['review'],
        ]);

        $softwareReview->load('user:id,name');

        return response()->json([
            'message' => 'Review berhasil diperbarui.',
            'data' => $softwareReview,
        ]);
    }

    /**
     * Delete user's own review.
     *
     * DELETE /api/software-reviews/{softwareReview}
     */
    public function destroy(
        Request $request,
        SoftwareReview $softwareReview
    ) {
        /*
        |--------------------------------------------------------------------------
        | Authorization
        |--------------------------------------------------------------------------
        */

        if ($softwareReview->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk menghapus review ini.',
            ], 403);
        }

        $softwareReview->delete();

        return response()->json([
            'message' => 'Review berhasil dihapus.',
        ]);
    }
}