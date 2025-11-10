<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssetNetwork extends Model
{
    protected $fillable = [
        'asset_id',
        'mgmt_ip',
        'hostname',
        'os_firmware',
        'vlan',
        'subnet_id',
    ];

    // Relationships
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    public function subnet(): BelongsTo
    {
        return $this->belongsTo(Subnet::class);
    }
}