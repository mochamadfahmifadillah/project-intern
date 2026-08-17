<?php

namespace App\Http\Controllers;

use App\Models\SoftwarePricing;
use Illuminate\Http\Request;

class SoftwarePricingController extends Controller
{
    public function index()
    {
        $pricings = SoftwarePricing::with('software')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data pricing software berhasil diambil.',
            'data' => $pricings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'software_id' => [
                'required',
                'integer',
                'exists:softwares,id',
            ],
            'pricing_type' => [
                'required',
                'in:free,freemium,paid,custom',
            ],
            'price' => [
                'nullable',
                'numeric',
                'min:0',
            ],
            'currency' => [
                'nullable',
                'string',
                'size:3',
            ],
            'billing_period' => [
                'nullable',
                'in:monthly,yearly,one_time,custom',
            ],
            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $pricing = SoftwarePricing::create($validated);

        $pricing->load('software');

        return response()->json([
            'message' => 'Pricing software berhasil dibuat.',
            'data' => $pricing,
        ], 201);
    }

    public function show(SoftwarePricing $softwarePricing)
    {
        $softwarePricing->load('software');

        return response()->json([
            'message' => 'Detail pricing software berhasil diambil.',
            'data' => $softwarePricing,
        ]);
    }

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
            'pricing_type' => [
                'required',
                'in:free,freemium,paid,custom',
            ],
            'price' => [
                'nullable',
                'numeric',
                'min:0',
            ],
            'currency' => [
                'nullable',
                'string',
                'size:3',
            ],
            'billing_period' => [
                'nullable',
                'in:monthly,yearly,one_time,custom',
            ],
            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $softwarePricing->update($validated);

        $softwarePricing->load('software');

        return response()->json([
            'message' => 'Pricing software berhasil diperbarui.',
            'data' => $softwarePricing->fresh('software'),
        ]);
    }

    public function destroy(SoftwarePricing $softwarePricing)
    {
        $softwarePricing->delete();

        return response()->json([
            'message' => 'Pricing software berhasil dihapus.',
        ]);
    }
}