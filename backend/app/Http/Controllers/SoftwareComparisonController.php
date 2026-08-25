<?php

namespace App\Http\Controllers;

use App\Models\Software;
use App\Models\SoftwareRating;
use Illuminate\Http\Request;

class SoftwareComparisonController extends Controller
{
    /**
     * Compare multiple softwares.
     *
     * GET /api/v1/software-comparison?software[]=figma&software[]=canva
     *
     * Maximum 3 softwares.
     */
    public function index(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Validate Request
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'software' => [
                'required',
                'array',
                'min:2',
                'max:3',
            ],

            'software.*' => [
                'required',
                'string',
                'distinct',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Get Software Slugs
        |--------------------------------------------------------------------------
        */

        $slugs = $validated['software'];

        /*
        |--------------------------------------------------------------------------
        | Get Software Data
        |--------------------------------------------------------------------------
        */

        $softwares = Software::with([
            'category',
            'vendor',
            'features',
            'pricings',
            'integrations',
        ])
            ->whereIn('slug', $slugs)
            ->where('status', 'active')
            ->get();

        /*
        |--------------------------------------------------------------------------
        | Validate Software Exists
        |--------------------------------------------------------------------------
        */

        if ($softwares->count() !== count($slugs)) {
            return response()->json([
                'success' => false,
                'message' => 'Salah satu software tidak ditemukan atau tidak aktif.',
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Transform Data
        |--------------------------------------------------------------------------
        */

        $data = $softwares->map(function ($software) {

            /*
            |--------------------------------------------------------------------------
            | Rating
            |--------------------------------------------------------------------------
            */

            $ratingQuery = SoftwareRating::where(
                'software_id',
                $software->id
            );

            $totalRatings = $ratingQuery->count();

            $averageRating = $totalRatings > 0
                ? round($ratingQuery->avg('rating'), 1)
                : 0;

            /*
            |--------------------------------------------------------------------------
            | Response Data
            |--------------------------------------------------------------------------
            */

            return [
                'id' => $software->id,
                'category_id' => $software->category_id,
                'name' => $software->name,
                'slug' => $software->slug,
                'description' => $software->description,
                'website_url' => $software->website_url,
                'logo' => $software->logo,
                'status' => $software->status,

                /*
                |--------------------------------------------------------------------------
                | Category
                |--------------------------------------------------------------------------
                */

                'category' => $software->category
                    ? [
                        'id' => $software->category->id,
                        'name' => $software->category->name,
                        'slug' => $software->category->slug,
                    ]
                    : null,

                /*
                |--------------------------------------------------------------------------
                | Vendor
                |--------------------------------------------------------------------------
                */

                'vendor' => $software->vendor
                    ? [
                        'id' => $software->vendor->id,
                        'name' => $software->vendor->name,
                        'description' => $software->vendor->description,
                        'website_url' => $software->vendor->website_url,
                        'logo' => $software->vendor->logo,
                    ]
                    : null,

                /*
                |--------------------------------------------------------------------------
                | Features
                |--------------------------------------------------------------------------
                */

                'features' => $software->features
                    ->map(function ($feature) {
                        return [
                            'id' => $feature->id,
                            'name' => $feature->name,
                            'description' => $feature->description,
                        ];
                    })
                    ->values(),

                /*
                |--------------------------------------------------------------------------
                | Pricing
                |--------------------------------------------------------------------------
                */

                'pricings' => $software->pricings
                    ->map(function ($pricing) {
                        return [
                            'id' => $pricing->id,
                            'name' => $pricing->name,
                            'price' => $pricing->price,
                            'description' => $pricing->description,
                        ];
                    })
                    ->values(),

                /*
                |--------------------------------------------------------------------------
                | Integrations
                |--------------------------------------------------------------------------
                */

                'integrations' => $software->integrations
                    ->map(function ($integration) {
                        return [
                            'id' => $integration->id,
                            'name' => $integration->name,
                            'description' => $integration->description,
                        ];
                    })
                    ->values(),

                /*
                |--------------------------------------------------------------------------
                | Rating
                |--------------------------------------------------------------------------
                */

                'rating' => [
                    'average_rating' => $averageRating,
                    'total_ratings' => $totalRatings,
                ],
            ];
        })->values();

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'success' => true,
            'message' => 'Software comparison berhasil diambil.',
            'data' => $data,
        ]);
    }
}