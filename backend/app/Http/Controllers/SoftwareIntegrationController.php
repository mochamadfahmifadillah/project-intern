<?php

namespace App\Http\Controllers;

use App\Models\SoftwareIntegration;
use Illuminate\Http\Request;

class SoftwareIntegrationController extends Controller
{
    public function index()
    {
        $integrations = SoftwareIntegration::with('software')
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Data integrasi software berhasil diambil.',
            'data' => $integrations,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'software_id' => 'required|exists:softwares,id',
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'website_url' => 'nullable|url|max:255',
            'is_active' => 'sometimes|boolean',
        ]);

        $integration = SoftwareIntegration::create($validated);

        return response()->json([
            'message' => 'Integrasi software berhasil dibuat.',
            'data' => $integration->load('software'),
        ], 201);
    }

    public function show(SoftwareIntegration $softwareIntegration)
    {
        $softwareIntegration->load('software');

        return response()->json([
            'message' => 'Detail integrasi software berhasil diambil.',
            'data' => $softwareIntegration,
        ]);
    }

    public function update(
        Request $request,
        SoftwareIntegration $softwareIntegration
    ) {
        $validated = $request->validate([
            'software_id' => 'sometimes|exists:softwares,id',
            'name' => 'sometimes|string|max:255',
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'website_url' => 'nullable|url|max:255',
            'is_active' => 'sometimes|boolean',
        ]);

        $softwareIntegration->update($validated);

        return response()->json([
            'message' => 'Integrasi software berhasil diperbarui.',
            'data' => $softwareIntegration->fresh()->load('software'),
        ]);
    }

    public function destroy(SoftwareIntegration $softwareIntegration)
    {
        $softwareIntegration->delete();

        return response()->json([
            'message' => 'Integrasi software berhasil dihapus.',
        ]);
    }
}