<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PermissionController extends Controller
{
    /**
     * Menampilkan semua permission.
     */
    public function index()
    {
        $permissions = Permission::orderBy('name')->get();

        return response()->json([
            'message' => 'Data permission berhasil diambil.',
            'data' => $permissions,
        ]);
    }

    /**
     * Menampilkan detail permission.
     */
    public function show(Permission $permission)
    {
        return response()->json([
            'message' => 'Detail permission berhasil diambil.',
            'data' => $permission,
        ]);
    }

    /**
     * Membuat permission baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:permissions,name',
            ],
            'description' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $permission = Permission::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        return response()->json([
            'message' => 'Permission berhasil dibuat.',
            'data' => $permission,
        ], 201);
    }

    /**
     * Mengubah permission.
     */
    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('permissions', 'name')
                    ->ignore($permission->id),
            ],
            'description' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $permission->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        return response()->json([
            'message' => 'Permission berhasil diperbarui.',
            'data' => $permission->fresh(),
        ]);
    }

    /**
     * Menghapus permission.
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return response()->json([
            'message' => 'Permission berhasil dihapus.',
        ]);
    }
}