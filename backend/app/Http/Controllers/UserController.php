<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Menampilkan semua user.
     */
    public function index()
    {
        return response()->json(
            User::with('roles')->get()
        );
    }

    /**
     * Menampilkan detail user.
     */
    public function show(User $user)
    {
        return response()->json(
            $user->load('roles')
        );
    }

    /**
     * Membuat user baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
            'role_id' => [
                'nullable',
                'integer',
                'exists:roles,id',
            ],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        if ($request->filled('role_id')) {
            $user->roles()->sync([
                $validated['role_id'],
            ]);
        }

        return response()->json([
            'message' => 'User berhasil dibuat',
            'user' => $user->fresh()->load('roles'),
        ], 201);
    }

    /**
     * Mengubah user.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role_id' => [
                'nullable',
                'integer',
                'exists:roles,id',
            ],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        /*
         * User hanya memiliki satu role.
         *
         * Jika role_id dikirim:
         *   role lama diganti dengan role baru.
         *
         * Jika role_id null:
         *   semua role user dihapus.
         */
        $user->roles()->sync(
            $request->filled('role_id')
                ? [$validated['role_id']]
                : []
        );

        return response()->json([
            'message' => 'User berhasil diperbarui',
            'user' => $user->fresh()->load('roles'),
        ]);
    }

    /**
     * Menghapus user.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus',
        ]);
    }
}