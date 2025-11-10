<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asset extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'asset_type',
        'name',
        'tag',
        'vendor_id',
        'model',
        'serial',
        'location_id',
        'status',
        'purchase_date',
        'warranty_end',
        'last_seen',
        'notes',
    ];

    protected $attributes = [
        'model' => '',
        'serial' => '',
        'notes' => '',
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'warranty_end' => 'date',
        'last_seen' => 'datetime',
    ];

    // Relationships
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function network(): HasOne
    {
        return $this->hasOne(AssetNetwork::class);
    }

    public function alerts(): HasMany
    {
        return $this->hasMany(Alert::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class, 'entity_id')->where('entity_type', 'asset');
    }

    // Scopes
    public function scopeRouters($query)
    {
        return $query->where('asset_type', 'router');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'in_service');
    }

    public function scopeSwitches($query)
    {
        return $query->where('asset_type', 'switch');
    }

    public function scopeWithAlerts($query)
    {
        return $query->whereHas('alerts', function ($q) {
            $q->where('status', 'active');
        });
    }
}