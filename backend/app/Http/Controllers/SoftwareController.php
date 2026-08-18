<?php

namespace App\Http\Controllers;

use App\Models\Software;
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
        ]);

        /*
        |--------------------------------------------------------------------------
        | Generate Slug
        |--------------------------------------------------------------------------
        */

        $validated['slug'] =
            $validated['slug'] ?? Str::slug($validated['name']);

        /*
        |--------------------------------------------------------------------------
        | Default Status
        |--------------------------------------------------------------------------
        */

        $validated['status'] =
            $validated['status'] ?? 'active';

        /*
        |--------------------------------------------------------------------------
        | Check Duplicate Slug
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
        | Create Software
        |--------------------------------------------------------------------------
        */

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
        ]);

        /*
        |--------------------------------------------------------------------------
        | Generate Slug
        |--------------------------------------------------------------------------
        */

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Software
        |--------------------------------------------------------------------------
        */

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

    /**
     * Display public software directory.
     *
     * Supports:
     * - search by software name
     * - search by software description
     * - search by category name
     * - filter by category slug
     */
    public function publicIndex(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Base Query
        |--------------------------------------------------------------------------
        */

        $query = Software::with('category')
            ->where('status', 'active');

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if ($request->filled('search')) {
            $search = trim($request->search);

            $query->where(function ($q) use ($search) {
                $q->where('name', 'ILIKE', "%{$search}%")
                    ->orWhere('description', 'ILIKE', "%{$search}%")
                    ->orWhereHas('category', function ($categoryQuery) use ($search) {
                        $categoryQuery->where(
                            'name',
                            'ILIKE',
                            "%{$search}%"
                        );
                    });
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Category Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('category')) {
            $category = trim($request->category);

            $query->whereHas('category', function ($categoryQuery) use ($category) {
                $categoryQuery->where('slug', $category);
            });
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
            'pricings',
            'integrations',
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