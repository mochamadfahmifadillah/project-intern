<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register user baru.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->load([
            'roles.permissions',
        ]);

        $token = $user
            ->createToken('auth_token')
            ->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Login user.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where(
            'email',
            $validated['email']
        )->first();

        if (
            !$user ||
            !Hash::check(
                $validated['password'],
                $user->password
            )
        ) {
            return response()->json([
                'message' => 'Email atau password salah',
            ], 401);
        }

        $user->load([
            'roles.permissions',
        ]);

        $token = $user
            ->createToken('auth_token')
            ->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Mengubah password user yang sedang login.
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => [
                'required',
                'string',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $user = $request->user();

        if (
            !$user ||
            !Hash::check(
                $validated['current_password'],
                $user->password
            )
        ) {
            return response()->json([
                'message' => 'Password saat ini salah.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make(
                $validated['password']
            ),
        ]);

        return response()->json([
            'message' => 'Password berhasil diperbarui.',
        ]);
    }

    /**
     * Dashboard statistics berdasarkan permission user.
     */
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        $user->load([
            'roles.permissions',
        ]);

        $permissions = $user->roles
            ->flatMap(function ($role) {
                return $role->permissions;
            })
            ->pluck('name')
            ->unique();

        return response()->json([
            'statistics' => [
                'users' => $permissions->contains('users.view')
                    ? User::count()
                    : null,

                'roles' => $permissions->contains('roles.view')
                    ? Role::count()
                    : null,

                'permissions' => $permissions->contains('permissions.view')
                    ? Permission::count()
                    : null,
            ],
        ]);
    }

    /**
     * Logout user.
     */
    public function logout(Request $request): JsonResponse
    {
        $token = $request
            ->user()
            ->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    /**
     * Mendapatkan data user yang sedang login.
     */
    public function user(Request $request): JsonResponse
    {
        $user = $request->user();

        $user->load([
            'roles.permissions',
        ]);

        return response()->json([
            'user' => $user,
        ]);
    }
}
