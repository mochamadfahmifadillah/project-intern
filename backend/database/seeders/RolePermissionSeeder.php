<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // =========================
        // ROLES
        // =========================

        $superAdmin = Role::firstOrCreate(
            ['name' => 'super-admin'],
            ['description' => 'Memiliki seluruh akses sistem']
        );

        $admin = Role::firstOrCreate(
            ['name' => 'admin'],
            ['description' => 'Administrator sistem']
        );

        $staff = Role::firstOrCreate(
            ['name' => 'staff'],
            ['description' => 'Pengguna staff']
        );

        // =========================
        // PERMISSIONS
        // =========================

        $permissions = [
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',

            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',
        ];

        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(
                ['name' => $permissionName],
                ['description' => 'Permission untuk ' . $permissionName]
            );
        }

        // =========================
        // SUPER ADMIN
        // =========================

        $superAdmin->permissions()->sync(
            Permission::all()->pluck('id')
        );

        // =========================
        // ADMIN
        // =========================

        $admin->permissions()->sync(
            Permission::whereIn('name', [
                'users.view',
                'users.create',
                'users.edit',
                'users.delete',

                'roles.view',
                'roles.create',
                'roles.edit',
                'roles.delete',

                'permissions.view',
            ])->pluck('id')
        );

        // =========================
        // STAFF
        // =========================

        $staff->permissions()->sync(
            Permission::whereIn('name', [
                'users.view',
            ])->pluck('id')
        );

        // =========================
        // ASSIGN ROLE TO ADMIN USER
        // =========================

        $user = User::where(
            'email',
            'admin@projectmagang.test'
        )->first();

        if ($user) {
            $user->roles()->syncWithoutDetaching([
                $superAdmin->id,
            ]);
        }
    }
}