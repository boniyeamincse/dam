<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Domain;

class DomainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Domain::create([
            'type' => 'domain',
            'asset_id' => 'DM-001',
            'asset_tag' => 'akij.com',
            'status' => 'Active',
            'environment' => 'Production',
            'business_unit' => 'Corporate',
            'purpose' => 'Primary corporate website',
            'primary_owner' => 'IT Manager',
            'owner_email' => 'it.manager@akij.com',
            'technical_owner' => 'Systems Admin',
            'tech_email' => 'sysadmin@akij.com',
            'registrar' => 'Namecheap',
            'registrant_org' => 'Akij Group',
            'registration_date' => now()->subYears(5),
            'expiry_date' => now()->addMonths(6),
            'auto_renew' => true,
            'renewal_term' => 1,
            'cost_per_term' => 15.99,
            'currency' => 'USD',
            'billing_owner' => 'Finance Dept',
            'gl_cost_center' => 'IT-001',
            'nameserver1' => 'ns1.namecheap.com',
            'nameserver2' => 'ns2.namecheap.com',
            'cdn_waf' => 'Cloudflare',
            'primary_url' => 'akij.com',
            'redirect_target' => null,
            'notes' => 'Primary corporate domain',
        ]);

        Domain::create([
            'type' => 'subdomain',
            'asset_id' => 'DM-002',
            'asset_tag' => 'portal.akij.com',
            'status' => 'Active',
            'environment' => 'Production',
            'business_unit' => 'IT',
            'purpose' => 'Employee portal',
            'primary_owner' => 'HR Manager',
            'owner_email' => 'hr.manager@akij.com',
            'technical_owner' => 'DevOps Lead',
            'tech_email' => 'devops@akij.com',
            'registrar' => 'Namecheap',
            'registrant_org' => 'Akij Group',
            'registration_date' => now()->subYears(2),
            'expiry_date' => now()->addDays(15),
            'auto_renew' => false,
            'renewal_term' => 1,
            'cost_per_term' => 5.00,
            'currency' => 'USD',
            'billing_owner' => 'IT Dept',
            'gl_cost_center' => 'IT-002',
            'nameserver1' => 'ns1.namecheap.com',
            'nameserver2' => 'ns2.namecheap.com',
            'cdn_waf' => 'None',
            'primary_url' => 'portal.akij.com',
            'redirect_target' => null,
            'notes' => 'Employee self-service portal',
        ]);
    }
}
