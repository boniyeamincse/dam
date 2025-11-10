<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vendor extends Model
{
    protected $fillable = [
        'name',
        'code',
        'category',
        'phone',
        'contact_email',
        'website',
        'address',
        'city',
        'country',
        'account_manager_name',
        'account_manager_email',
        'account_manager_phone',
        'support_email',
        'support_phone',
        'support_portal_url',
        'sla_hours',
        'status',
        'notes',
    ];

    // Relationships
    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'asset_id');
    }

    public function assets(): HasMany
    {
        return $this->hasMany(AssetVendor::class);
    }

    // Accessors
    public function getActiveContractsCountAttribute()
    {
        return $this->contracts()->where('status', 'Active')->count();
    }
}
