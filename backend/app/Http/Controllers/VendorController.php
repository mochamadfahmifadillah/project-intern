<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    /**
     * Display a listing of vendors.
     */
    public function index(): JsonResponse
    {
        $vendors = Vendor::latest()->get();

        return response()->json([
            'message' => 'Data vendor berhasil diambil.',
            'data' => $vendors,
        ]);
    }

    /**
     * Store a newly created vendor.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
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

            'email' => [
                'nullable',
                'email',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:50',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'logo' => [
                'nullable',
                'string',
                'max:255',
            ],

            'is_active' => [
                'sometimes',
                'boolean',
            ],
        ]);

        $vendor = Vendor::create($validated);

        return response()->json([
            'message' => 'Vendor berhasil ditambahkan.',
            'data' => $vendor,
        ], 201);
    }

    /**
     * Display the specified vendor.
     */
    public function show(Vendor $vendor): JsonResponse
    {
        return response()->json([
            'message' => 'Data vendor berhasil diambil.',
            'data' => $vendor,
        ]);
    }

    /**
     * Update the specified vendor.
     */
    public function update(Request $request, Vendor $vendor): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
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

            'email' => [
                'nullable',
                'email',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:50',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'logo' => [
                'nullable',
                'string',
                'max:255',
            ],

            'is_active' => [
                'sometimes',
                'boolean',
            ],
        ]);

        $vendor->update($validated);

        return response()->json([
            'message' => 'Vendor berhasil diperbarui.',
            'data' => $vendor->fresh(),
        ]);
    }

    /**
     * Remove the specified vendor.
     */
    public function destroy(Vendor $vendor): JsonResponse
    {
        $vendor->delete();

        return response()->json([
            'message' => 'Vendor berhasil dihapus.',
        ]);
    }
}