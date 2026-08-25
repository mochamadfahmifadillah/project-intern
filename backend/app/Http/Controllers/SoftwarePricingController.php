<?php

namespace App\Http\Controllers;

use App\Models\SoftwarePricing;
use Illuminate\Http\Request;

class SoftwarePricingController extends Controller
{
    /**
     * Display a listing of software pricings.
     */
    public function index()
    {
        $pricings = SoftwarePricing::with([
            'software',
            'pricingModel',
        ])
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data pricing software berhasil diambil.',
            'data' => $pricings,
        ]);
    }

    /**
     * Store a newly created software pricing.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'software_id' => [
                'required',
                'integer',
                'exists:softwares,id',
            ],

            'pricing_model_id' => [
                'required',
                'integer',
                'exists:pricing_models,id',
            ],

            'price' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $pricing = SoftwarePricing::create($validated);

        $pricing->load([
            'software',
            'pricingModel',
        ]);

        return response()->json([
            'message' => 'Pricing software berhasil dibuat.',
            'data' => $pricing,
        ], 201);
    }

    /**
     * Display the specified software pricing.
     */
    public function show(SoftwarePricing $softwarePricing)
    {
        $softwarePricing->load([
            'software',
            'pricingModel',
        ]);

        return response()->json([
            'message' => 'Detail pricing software berhasil diambil.',
            'data' => $softwarePricing,
        ]);
    }

    /**
     * Update the specified software pricing.
     */
    public function update(
        Request $request,
        SoftwarePricing $softwarePricing
    ) {
        $validated = $request->validate([
            'software_id' => [
                'required',
                'integer',
                'exists:softwares,id',
            ],

            'pricing_model_id' => [
                'required',
                'integer',
                'exists:pricing_models,id',
            ],

            'price' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $softwarePricing->update($validated);

        $softwarePricing->load([
            'software',
            'pricingModel',
        ]);

        return response()->json([
            'message' => 'Pricing software berhasil diperbarui.',
            'data' => $softwarePricing,
        ]);
    }

    /**
     * Remove the specified software pricing.
     */
    public function destroy(SoftwarePricing $softwarePricing)
    {
        $softwarePricing->delete();

        return response()->json([
            'message' => 'Pricing software berhasil dihapus.',
        ]);
    }
}
