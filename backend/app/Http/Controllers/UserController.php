<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::with('roles')->get()
        );
    }

    public function show(User $user)
    {
        return response()->json(
            $user->load('roles')
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role_id' => ['nullable', 'exists:roles,id'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        if (!empty($validated['role_id'])) {
            $user->roles()->sync([$validated['role_id']]);
        }

        return response()->json([
            'message' => 'User berhasil dibuat',
            'user' => $user->load('roles'),
        ], 201);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role_id' => ['nullable', 'exists:roles,id'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        $user->roles()->sync(
            !empty($validated['role_id'])
                ? [$validated['role_id']]
                : []
        );

        return response()->json([
            'message' => 'User berhasil diperbarui',
            'user' => $user->fresh()->load('roles'),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus',
        ]);
    }
}