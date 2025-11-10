<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Domain extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'type',
        'asset_id',
        'asset_tag',
        'status',
        'environment',
        'business_unit',
        'purpose',
        'primary_owner',
        'owner_email',
        'technical_owner',
        'tech_email',
        'registrar',
        'registrant_org',
        'registration_date',
        'expiry_date',
        'auto_renew',
        'renewal_term',
        'cost_per_term',
        'currency',
        'billing_owner',
        'gl_cost_center',
        'nameserver1',
        'nameserver2',
        'cdn_waf',
        'primary_url',
        'redirect_target',
        'notes',
    ];

    protected $casts = [
        'registration_date' => 'date',
        'expiry_date' => 'date',
        'auto_renew' => 'boolean',
        'cost_per_term' => 'decimal:2',
    ];
}
