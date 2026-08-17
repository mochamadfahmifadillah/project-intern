<?php

namespace App\Http\Controllers;

use App\Models\Software;
use App\Models\SoftwareFeature;
use Illuminate\Http\Request;

class SoftwareFeatureController extends Controller
{
    public function index()
    {
        $features = SoftwareFeature::with('software')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data fitur software berhasil diambil.',
            'data' => $features,
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
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $feature = SoftwareFeature::create($validated);

        $feature->load('software');

        return response()->json([
            'message' => 'Fitur software berhasil dibuat.',
            'data' => $feature,
        ], 201);
    }

    public function show(SoftwareFeature $softwareFeature)
    {
        $softwareFeature->load('software');

        return response()->json([
            'message' => 'Detail fitur software berhasil diambil.',
            'data' => $softwareFeature,
        ]);
    }

    public function update(
        Request $request,
        SoftwareFeature $softwareFeature
    ) {
        $validated = $request->validate([
            'software_id' => [
                'required',
                'integer',
                'exists:softwares,id',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $softwareFeature->update($validated);

        $softwareFeature->load('software');

        return response()->json([
            'message' => 'Fitur software berhasil diperbarui.',
            'data' => $softwareFeature->fresh('software'),
        ]);
    }

    public function destroy(SoftwareFeature $softwareFeature)
    {
        $softwareFeature->delete();

        return response()->json([
            'message' => 'Fitur software berhasil dihapus.',
        ]);
    }
}