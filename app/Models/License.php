<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class License extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'product_key',
        'license_key',
        'version',
        'vendor_id',
        'purchase_date',
        'expiration_date',
        'quantity',
        'cost',
        'status',
        'compliance_status',
        'notes',
        'metadata',
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'expiration_date' => 'date',
        'quantity' => 'integer',
        'cost' => 'decimal:2',
        'metadata' => 'array',
    ];

    protected $attributes = [
        'quantity' => 1,
        'status' => 'Active',
        'compliance_status' => 'Licensed',
    ];

    // Relationships
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function installations(): HasMany
    {
        return $this->hasMany(LicenseInstallation::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'entity_id')->where('entity_type', 'license');
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class, 'entity_id')->where('entity_type', 'license');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function scopeExpired($query)
    {
        return $query->where('expiration_date', '<', now());
    }

    public function scopeExpiringSoon($query, $days = 30)
    {
        return $query->where('expiration_date', '<=', now()->addDays($days))
                    ->where('expiration_date', '>', now());
    }

    public function scopeCompliant($query)
    {
        return $query->where('compliance_status', 'Licensed');
    }

    public function scopeByVendor($query, $vendorId)
    {
        return $query->where('vendor_id', $vendorId);
    }

    // Accessors
    public function getIsExpiredAttribute()
    {
        return $this->expiration_date && $this->expiration_date->isPast();
    }

    public function getIsExpiringSoonAttribute()
    {
        return $this->expiration_date &&
               $this->expiration_date->isFuture() &&
               $this->expiration_date->diffInDays(now()) <= 30;
    }

    public function getDaysUntilExpirationAttribute()
    {
        return $this->expiration_date ? $this->expiration_date->diffInDays(now()) : null;
    }

    public function getAvailableInstallationsAttribute()
    {
        return $this->quantity - $this->installations()->where('status', 'Active')->count();
    }
}
