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

            // =========================
            // User Management
            // =========================

            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // =========================
            // Role Management
            // =========================

            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',

            // =========================
            // Permission Management
            // =========================

            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',

            // =========================
            // Software Category Management
            // =========================

            'software-categories.view',
            'software-categories.create',
            'software-categories.edit',
            'software-categories.delete',

            // =========================
            // Software Management
            // =========================

            'softwares.view',
            'softwares.create',
            'softwares.edit',
            'softwares.delete',

            // =========================
            // Software Pricing Management
            // =========================

            'software-pricings.view',
            'software-pricings.create',
            'software-pricings.edit',
            'software-pricings.delete',

            // =========================
            // Software Integration Management
            // =========================

            'software-integrations.view',
            'software-integrations.create',
            'software-integrations.edit',
            'software-integrations.delete',

            // =========================
            // Vendor Management
            // =========================

            'vendors.view',
            'vendors.create',
            'vendors.edit',
            'vendors.delete',
        ];

        // =========================
        // CREATE PERMISSIONS
        // =========================

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
        // Super Admin memiliki seluruh permission.

        $superAdmin->permissions()->sync(
            Permission::all()->pluck('id')
        );

        // =========================
        // ADMIN
        // =========================
        // Admin memiliki akses CRUD untuk
        // seluruh fitur utama sistem.

        $admin->permissions()->sync(
            Permission::whereIn('name', [

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

                // Software Integrations
                'software-integrations.view',
                'software-integrations.create',
                'software-integrations.edit',
                'software-integrations.delete',

                // Vendors
                'vendors.view',
                'vendors.create',
                'vendors.edit',
                'vendors.delete',

            ])->pluck('id')
        );

        // =========================
        // STAFF
        // =========================
        // Staff hanya memiliki akses untuk melihat
        // data yang diperlukan.

        $staff->permissions()->sync(
            Permission::whereIn('name', [

                // User
                'users.view',

                // Software Directory
                'software-categories.view',
                'softwares.view',

                // Software Pricing
                'software-pricings.view',

                // Software Integrations
                'software-integrations.view',

                // Vendors
                'vendors.view',

            ])->pluck('id')
        );

        // =========================
        // ASSIGN SUPER ADMIN ROLE
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