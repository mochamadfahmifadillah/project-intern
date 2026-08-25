<?php

namespace App\Http\Controllers;

use App\Models\Software;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SoftwareController extends Controller
{
    /**
     * Display a listing of software for admin.
     */
    public function index()
    {
        $softwares = Software::with([
            'category',
            'features',
            'pricings.pricingModel',
            'integrations',
            'ratings',
            'reviews',
            'industries',
            'businessSizes',
        ])
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data software berhasil diambil.',
            'data' => $softwares,
        ]);
    }

    /**
     * Store a newly created software.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:software_categories,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:softwares,slug',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'website_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'logo' => [
                'nullable',
                'string',
                'max:255',
            ],

            'status' => [
                'nullable',
                'in:active,inactive',
            ],

            /*
            |--------------------------------------------------------------------------
            | Industry
            |--------------------------------------------------------------------------
            */

            'industry_ids' => [
                'nullable',
                'array',
            ],

            'industry_ids.*' => [
                'integer',
                'exists:industries,id',
            ],

            /*
            |--------------------------------------------------------------------------
            | Business Size
            |--------------------------------------------------------------------------
            */

            'business_size_ids' => [
                'nullable',
                'array',
            ],

            'business_size_ids.*' => [
                'integer',
                'exists:business_sizes,id',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Generate Slug
        |--------------------------------------------------------------------------
        */

        $validated['slug'] = $validated['slug']
            ?? Str::slug($validated['name']);

        /*
        |--------------------------------------------------------------------------
        | Default Status
        |--------------------------------------------------------------------------
        */

        $validated['status'] = $validated['status']
            ?? 'active';

        /*
        |--------------------------------------------------------------------------
        | Extract Relationship IDs
        |--------------------------------------------------------------------------
        */

        $industryIds = $validated['industry_ids'] ?? [];
        $businessSizeIds = $validated['business_size_ids'] ?? [];

        unset(
            $validated['industry_ids'],
            $validated['business_size_ids']
        );

        /*
        |--------------------------------------------------------------------------
        | Extra Slug Check
        |--------------------------------------------------------------------------
        */

        if (Software::where('slug', $validated['slug'])->exists()) {
            return response()->json([
                'message' => 'Slug software sudah digunakan.',
                'errors' => [
                    'slug' => [
                        'Slug software sudah digunakan.',
                    ],
                ],
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Create Software + Relationships
        |--------------------------------------------------------------------------
        */

        $software = DB::transaction(function () use (
            $validated,
            $industryIds,
            $businessSizeIds
        ) {
            $software = Software::create($validated);

            $software->industries()->sync($industryIds);

            $software->businessSizes()->sync($businessSizeIds);

            return $software;
        });

        /*
        |--------------------------------------------------------------------------
        | Load Relationships
        |--------------------------------------------------------------------------
        */

        $software->load([
            'category',
            'features',
            'pricings.pricingModel',
            'integrations',
            'ratings',
            'reviews',
            'industries',
            'businessSizes',
        ]);

        return response()->json([
            'message' => 'Software berhasil dibuat.',
            'data' => $software,
        ], 201);
    }

    /**
     * Display the specified software for admin.
     */
    public function show(Software $software)
    {
        $software->load([
            'category',
            'features',
            'pricings.pricingModel',
            'integrations',
            'ratings',
            'reviews.user',
            'industries',
            'businessSizes',
        ]);

        return response()->json([
            'message' => 'Detail software berhasil diambil.',
            'data' => $software,
        ]);
    }

    /**
     * Update the specified software.
     */
    public function update(Request $request, Software $software)
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:software_categories,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:softwares,slug,' . $software->id,
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'website_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'logo' => [
                'nullable',
                'string',
                'max:255',
            ],

            'status' => [
                'nullable',
                'in:active,inactive',
            ],

            /*
            |--------------------------------------------------------------------------
            | Industry
            |--------------------------------------------------------------------------
            */

            'industry_ids' => [
                'nullable',
                'array',
            ],

            'industry_ids.*' => [
                'integer',
                'exists:industries,id',
            ],

            /*
            |--------------------------------------------------------------------------
            | Business Size
            |--------------------------------------------------------------------------
            */

            'business_size_ids' => [
                'nullable',
                'array',
            ],

            'business_size_ids.*' => [
                'integer',
                'exists:business_sizes,id',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Generate Slug
        |--------------------------------------------------------------------------
        */

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug(
                $validated['name']
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Extract Relationship IDs
        |--------------------------------------------------------------------------
        */

        $industryIds = $validated['industry_ids'] ?? [];
        $businessSizeIds = $validated['business_size_ids'] ?? [];

        unset(
            $validated['industry_ids'],
            $validated['business_size_ids']
        );

        /*
        |--------------------------------------------------------------------------
        | Check Duplicate Slug
        |--------------------------------------------------------------------------
        */

        $slugExists = Software::where(
            'slug',
            $validated['slug']
        )
            ->where('id', '!=', $software->id)
            ->exists();

        if ($slugExists) {
            return response()->json([
                'message' => 'Slug software sudah digunakan.',
                'errors' => [
                    'slug' => [
                        'Slug software sudah digunakan.',
                    ],
                ],
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Software + Relationships
        |--------------------------------------------------------------------------
        */

        DB::transaction(function () use (
            $software,
            $validated,
            $industryIds,
            $businessSizeIds
        ) {
            $software->update($validated);

            $software->industries()->sync($industryIds);

            $software->businessSizes()->sync($businessSizeIds);
        });

        /*
        |--------------------------------------------------------------------------
        | Reload Relationships
        |--------------------------------------------------------------------------
        */

        $software->load([
            'category',
            'features',
            'pricings.pricingModel',
            'integrations',
            'ratings',
            'reviews',
            'industries',
            'businessSizes',
        ]);

        return response()->json([
            'message' => 'Software berhasil diperbarui.',
            'data' => $software,
        ]);
    }

    /**
     * Remove the specified software.
     */
    public function destroy(Software $software)
    {
        $software->delete();

        return response()->json([
            'message' => 'Software berhasil dihapus.',
        ]);
    }

    /**
     * Display public software directory.
     *
     * Supported query parameters:
     *
     * ?search=figma
     * ?category=design
     * ?pricing=free
     * ?industry=technology
     * ?business_size=small-business
     *
     * Combination:
     *
     * ?search=crm
     * &category=sales
     * &pricing=paid
     * &industry=technology
     * &business_size=small-business
     */
    public function publicIndex(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Base Query
        |--------------------------------------------------------------------------
        */

        $query = Software::with([
            'category',
            'features',
            'pricings.pricingModel',
            'integrations',
            'ratings',
            'reviews',
            'industries',
            'businessSizes',
        ])
            ->where('status', 'active');

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        |
        | Search berdasarkan:
        | - software name
        | - description
        | - category
        | - industry
        | - business size
        |
        */

        if ($request->filled('search')) {
            $search = trim($request->search);

            $query->where(function ($q) use ($search) {
                $q->where(
                    'name',
                    'ILIKE',
                    "%{$search}%"
                )
                    ->orWhere(
                        'description',
                        'ILIKE',
                        "%{$search}%"
                    )
                    ->orWhereHas(
                        'category',
                        function ($categoryQuery) use ($search) {
                            $categoryQuery->where(
                                'name',
                                'ILIKE',
                                "%{$search}%"
                            );
                        }
                    )
                    ->orWhereHas(
                        'industries',
                        function ($industryQuery) use ($search) {
                            $industryQuery->where(
                                'name',
                                'ILIKE',
                                "%{$search}%"
                            );
                        }
                    )
                    ->orWhereHas(
                        'businessSizes',
                        function ($businessSizeQuery) use ($search) {
                            $businessSizeQuery->where(
                                'name',
                                'ILIKE',
                                "%{$search}%"
                            );
                        }
                    );
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Category Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('category')) {
            $category = trim($request->category);

            $query->whereHas(
                'category',
                function ($categoryQuery) use ($category) {
                    $categoryQuery->where(
                        'slug',
                        $category
                    );
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Pricing Filter
        |--------------------------------------------------------------------------
        |
        | Pricing diambil melalui:
        |
        | Software
        |     -> pricings
        |         -> pricingModel
        |
        | Jadi bukan pricing_type pada software_pricings.
        |
        */

        if ($request->filled('pricing')) {
            $pricing = trim($request->pricing);

            $query->whereHas(
                'pricings.pricingModel',
                function ($pricingQuery) use ($pricing) {
                    $pricingQuery
                        ->where('slug', $pricing)
                        ->orWhere('name', 'ILIKE', $pricing);
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Industry Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('industry')) {
            $industry = trim($request->industry);

            $query->whereHas(
                'industries',
                function ($industryQuery) use ($industry) {
                    $industryQuery->where(
                        'slug',
                        $industry
                    );
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Business Size Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('business_size')) {
            $businessSize = trim(
                $request->business_size
            );

            $query->whereHas(
                'businessSizes',
                function ($businessSizeQuery) use ($businessSize) {
                    $businessSizeQuery->where(
                        'slug',
                        $businessSize
                    );
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Get Result
        |--------------------------------------------------------------------------
        */

        $softwares = $query
            ->latest()
            ->get();

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Public software berhasil diambil.',
            'data' => $softwares,
        ]);
    }

    /**
     * Display public software detail.
     *
     * GET /api/software-directory/{slug}
     */
    public function publicShow(string $slug)
    {
        /*
        |--------------------------------------------------------------------------
        | Find Active Software By Slug
        |--------------------------------------------------------------------------
        */

        $software = Software::with([
            'category',
            'features',
            'pricings.pricingModel',
            'integrations',
            'ratings',
            'reviews.user',
            'industries',
            'businessSizes',
        ])
            ->where('status', 'active')
            ->where('slug', $slug)
            ->first();

        /*
        |--------------------------------------------------------------------------
        | Software Not Found
        |--------------------------------------------------------------------------
        */

        if (!$software) {
            return response()->json([
                'message' => 'Software tidak ditemukan.',
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Detail software berhasil diambil.',
            'data' => $software,
        ]);
    }
}
