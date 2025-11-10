<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RouterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create example router with mgmt_ip 10.10.1.1
        $asset = \App\Models\Asset::create([
            'asset_type' => 'router',
            'name' => 'Core Router 1',
            'tag' => 'RT-001',
            'model' => 'ISR 4451',
            'serial' => 'FOC12345678',
            'status' => 'Active',
            'purchase_date' => now()->subYears(2),
            'warranty_end' => now()->addYears(1),
            'last_seen' => now(),
            'notes' => 'Primary core router in data center A',
        ]);

        \App\Models\AssetNetwork::create([
            'asset_id' => $asset->id,
            'mgmt_ip' => '10.10.1.1',
            'hostname' => 'core-router-01.example.com',
            'os_firmware' => 'IOS XE 17.3.2',
            'vlan' => 'VLAN 10,20,30,100',
        ]);
    }
}
