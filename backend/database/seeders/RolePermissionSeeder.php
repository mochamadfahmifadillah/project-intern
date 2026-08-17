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
            // User Management
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // Role Management
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',

            // Permission Management
            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',

            // Software Category Management
            'software-categories.view',
            'software-categories.create',
            'software-categories.edit',
            'software-categories.delete',

            // Software Management
            'softwares.view',
            'softwares.create',
            'softwares.edit',
            'softwares.delete',

            // Software Pricing Management
            'software-pricings.view',
            'software-pricings.create',
            'software-pricings.edit',
            'software-pricings.delete',
        ];

        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(
                ['name' => $permissionName],
                [
                    'description' => 'Permission untuk ' . $permissionName,
                ]
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
                // Users
                'users.view',
                'users.create',
                'users.edit',
                'users.delete',

                // Roles
                'roles.view',
                'roles.create',
                'roles.edit',
                'roles.delete',

                // Permissions
                'permissions.view',

                // Software Categories
                'software-categories.view',
                'software-categories.create',
                'software-categories.edit',
                'software-categories.delete',

                // Software
                'softwares.view',
                'softwares.create',
                'softwares.edit',
                'softwares.delete',

                // Software Pricing
                'software-pricings.view',
                'software-pricings.create',
                'software-pricings.edit',
                'software-pricings.delete',
            ])->pluck('id')
        );

        // =========================
        // STAFF
        // =========================

        $staff->permissions()->sync(
            Permission::whereIn('name', [
                'users.view',

                // Software Directory
                'software-categories.view',
                'softwares.view',

                // Software Pricing
                'software-pricings.view',
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