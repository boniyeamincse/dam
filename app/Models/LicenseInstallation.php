<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class LicenseInstallation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'license_id',
        'hostname',
        'ip_address',
        'mac_address',
        'user',
        'department',
        'installed_date',
        'last_used',
        'status',
        'notes',
    ];

    protected $casts = [
        'installed_date' => 'date',
        'last_used' => 'date',
    ];

    protected $attributes = [
        'status' => 'Active',
    ];

    // Relationships
    public function license(): BelongsTo
    {
        return $this->belongsTo(License::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function scopeByLicense($query, $licenseId)
    {
        return $query->where('license_id', $licenseId);
    }

    // Accessors
    public function getIsActiveAttribute()
    {
        return $this->status === 'Active';
    }

    public function getLastUsedDaysAgoAttribute()
    {
        return $this->last_used ? $this->last_used->diffInDays(now()) : null;
    }
}
