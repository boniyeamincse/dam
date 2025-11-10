<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\AssetNetwork;
use App\Models\Location;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class SwitchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample vendors if they don't exist
        $cisco = Vendor::firstOrCreate(['name' => 'Cisco']);
        $juniper = Vendor::firstOrCreate(['name' => 'Juniper']);

        // Create sample locations if they don't exist
        $dataCenter = Location::firstOrCreate(['name' => 'Data Center A']);
        $floor2 = Location::firstOrCreate(['name' => 'Floor 2 Server Room']);

        // Create sample switch
        $switch = Asset::create([
            'asset_type' => 'switch',
            'name' => 'Core Switch 01',
            'tag' => 'AKJ-SW-0001',
            'vendor_id' => $cisco->id,
            'model' => 'Catalyst 2960',
            'serial' => 'ABC123456',
            'location_id' => $dataCenter->id,
            'status' => 'in_service',
            'purchase_date' => '2023-01-15',
            'warranty_end' => '2026-01-15',
            'notes' => 'Primary core switch for main data center',
        ]);

        // Create network configuration
        AssetNetwork::create([
            'asset_id' => $switch->id,
            'mgmt_ip' => '10.10.10.10',
            'hostname' => 'core-sw01.akij.net',
            'os_firmware' => '15.0(2)SE11',
            'vlan' => 10,
        ]);

        // Create sample access switch
        $accessSwitch = Asset::create([
            'asset_type' => 'switch',
            'name' => 'Access Switch 01',
            'tag' => 'AKJ-SW-0002',
            'vendor_id' => $cisco->id,
            'model' => 'Catalyst 2960',
            'serial' => 'DEF789012',
            'location_id' => $floor2->id,
            'status' => 'in_service',
            'purchase_date' => '2023-02-01',
            'warranty_end' => '2026-02-01',
            'notes' => 'Access switch for workstations',
        ]);

        // Create network configuration for access switch
        AssetNetwork::create([
            'asset_id' => $accessSwitch->id,
            'mgmt_ip' => '10.10.10.11',
            'hostname' => 'access-sw01.akij.net',
            'os_firmware' => '15.0(2)SE11',
            'vlan' => 20,
        ]);

        // Create spare switch
        $spareSwitch = Asset::create([
            'asset_type' => 'switch',
            'name' => 'Spare Switch 01',
            'tag' => 'AKJ-SW-0003',
            'vendor_id' => $juniper->id,
            'model' => 'EX2200',
            'serial' => 'JKL345678',
            'location_id' => $dataCenter->id,
            'status' => 'spare',
            'purchase_date' => '2023-03-01',
            'warranty_end' => '2026-03-01',
            'notes' => 'Spare switch for emergency replacements',
        ]);

        // Create network configuration for spare switch
        AssetNetwork::create([
            'asset_id' => $spareSwitch->id,
            'mgmt_ip' => '10.10.10.12',
            'hostname' => 'spare-sw01.akij.net',
            'os_firmware' => '12.3R12.4',
            'vlan' => null,
        ]);
    }
}
