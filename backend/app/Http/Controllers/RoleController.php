<?php

namespace App\Http\Controllers;

use App\Models\Permission;
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
        return response()->json(
            Role::with('permissions')
                ->orderBy('name')
                ->get()
        );
    }

    /**
     * Menampilkan detail role.
     */
    public function show(Role $role)
    {
        return response()->json(
            $role->load('permissions')
        );
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
            'message' => 'Role berhasil dibuat',
            'role' => $role->load('permissions'),
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
            'message' => 'Role berhasil diperbarui',
            'role' => $role->fresh('permissions'),
        ]);
    }

    /**
     * Menghapus role.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return response()->json([
            'message' => 'Role berhasil dihapus',
        ]);
    }
}