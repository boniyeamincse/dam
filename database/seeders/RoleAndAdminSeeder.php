<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RoleAndAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        Role::firstOrCreate(['name' => 'Org Admin']);
        Role::firstOrCreate(['name' => 'Location Admin']);
        Role::firstOrCreate(['name' => 'IT Engineer']);
        Role::firstOrCreate(['name' => 'Viewer']);
        Role::firstOrCreate(['name' => 'Auditor']);

        // Create default admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@akijgroup.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('StrongPass123!'),
            ]
        );

        // Assign Org Admin role to the admin user
        $admin->assignRole('Org Admin');
    }
}
