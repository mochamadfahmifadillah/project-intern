<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    /**
     * Menampilkan semua role.
     */
    public function index()
    {
        $roles = Role::with('permissions')
            ->orderBy('name')
            ->get();

        return response()->json([
            'message' => 'Data role berhasil diambil.',
            'data' => $roles,
        ]);
    }

    /**
     * Menampilkan detail role.
     */
    public function show(Role $role)
    {
        $role->load('permissions');

        return response()->json([
            'message' => 'Detail role berhasil diambil.',
            'data' => $role,
        ]);
    }

    /**
     * Membuat role baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:roles,name',
            ],
            'description' => [
                'nullable',
                'string',
                'max:255',
            ],
            'permission_ids' => [
                'nullable',
                'array',
            ],
            'permission_ids.*' => [
                'integer',
                'exists:permissions,id',
            ],
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        $role->permissions()->sync(
            $validated['permission_ids'] ?? []
        );

        return response()->json([
            'message' => 'Role berhasil dibuat.',
            'data' => $role->load('permissions'),
        ], 201);
    }

    /**
     * Mengubah role.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],
            'description' => [
                'nullable',
                'string',
                'max:255',
            ],
            'permission_ids' => [
                'nullable',
                'array',
            ],
            'permission_ids.*' => [
                'integer',
                'exists:permissions,id',
            ],
        ]);

        $role->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        $role->permissions()->sync(
            $validated['permission_ids'] ?? []
        );

        return response()->json([
            'message' => 'Role berhasil diperbarui.',
            'data' => $role->fresh('permissions'),
        ]);
    }

    /**
     * Menghapus role.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return response()->json([
            'message' => 'Role berhasil dihapus.',
        ]);
    }
}