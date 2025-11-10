<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vendors = [
            [
                'name' => 'Bangladesh Telecommunications Company Limited (BTCL)',
                'code' => 'BTCL',
                'category' => 'ISP',
                'phone' => '+880-2-9564231',
                'contact_email' => 'support@btcl.gov.bd',
                'website' => 'https://www.btcl.gov.bd',
                'address' => 'BTCL Bhaban, 37 Eskaton Garden Road',
                'city' => 'Dhaka',
                'country' => 'Bangladesh',
                'account_manager_name' => 'Md. Rahman',
                'account_manager_email' => 'rahman@btcl.gov.bd',
                'account_manager_phone' => '+880-1712345678',
                'support_email' => 'support@btcl.gov.bd',
                'support_phone' => '+880-2-9564231',
                'support_portal_url' => 'https://portal.btcl.gov.bd',
                'sla_hours' => 24,
                'status' => 'Active',
            ],
            [
                'name' => 'Cisco Systems Bangladesh',
                'code' => 'CISCO',
                'category' => 'Hardware',
                'phone' => '+880-2-8833000',
                'contact_email' => 'sales@cisco.com',
                'website' => 'https://www.cisco.com/bd',
                'address' => 'House 14, Road 35, Gulshan 2',
                'city' => 'Dhaka',
                'country' => 'Bangladesh',
                'account_manager_name' => 'Sarah Johnson',
                'account_manager_email' => 'sjohnson@cisco.com',
                'account_manager_phone' => '+880-1711223344',
                'support_email' => 'support@cisco.com',
                'support_phone' => '+880-2-8833001',
                'support_portal_url' => 'https://support.cisco.com',
                'sla_hours' => 12,
                'status' => 'Active',
            ],
            [
                'name' => 'Microsoft Bangladesh',
                'code' => 'MSFT',
                'category' => 'Software',
                'phone' => '+880-2-55667788',
                'contact_email' => 'partner@microsoft.com',
                'website' => 'https://www.microsoft.com/en-bd',
                'address' => 'Level 12, Navana Tower, 45 Gulshan Avenue',
                'city' => 'Dhaka',
                'country' => 'Bangladesh',
                'account_manager_name' => 'Ahmed Hassan',
                'account_manager_email' => 'ahassan@microsoft.com',
                'account_manager_phone' => '+880-1711556677',
                'support_email' => 'support@microsoft.com',
                'support_phone' => '+880-2-55667789',
                'support_portal_url' => 'https://support.microsoft.com',
                'sla_hours' => 8,
                'status' => 'Active',
            ],
        ];

        foreach ($vendors as $vendor) {
            \App\Models\Vendor::create($vendor);
        }

        // Create sample contracts
        $btcl = \App\Models\Vendor::where('code', 'BTCL')->first();
        $cisco = \App\Models\Vendor::where('code', 'CISCO')->first();

        if ($btcl) {
            \App\Models\Contract::create([
                'vendor_id' => $btcl->id,
                'title' => 'Internet Connectivity Services - 2024',
                'contract_no' => 'BTCL-2024-001',
                'type' => 'Subscription',
                'start_on' => now()->subMonths(6),
                'end_on' => now()->addDays(25), // Expiring in 25 days
                'auto_renew' => true,
                'renewal_term_months' => 12,
                'amount' => 150000.00,
                'currency' => 'BDT',
                'billing_cycle' => 'Monthly',
                'cost_center' => 'IT-001',
                'po_number' => 'PO-2024-001',
                'invoice_email' => 'billing@company.com',
                'termination_notice_days' => 30,
                'status' => 'Active',
            ]);
        }

        if ($cisco) {
            \App\Models\Contract::create([
                'vendor_id' => $cisco->id,
                'title' => 'Network Equipment Maintenance',
                'contract_no' => 'CISCO-AMC-2024',
                'type' => 'AMC',
                'start_on' => now()->subMonths(3),
                'end_on' => now()->addDays(15), // Expiring in 15 days
                'auto_renew' => false,
                'amount' => 250000.00,
                'currency' => 'BDT',
                'billing_cycle' => 'Yearly',
                'cost_center' => 'IT-002',
                'po_number' => 'PO-2024-002',
                'invoice_email' => 'billing@company.com',
                'termination_notice_days' => 60,
                'status' => 'Active',
            ]);
        }
    }
}
