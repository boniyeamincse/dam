<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SwitchPort extends Model
{
    protected $fillable = [
        'asset_id',
        'port_name',
        'admin_up',
        'oper_up',
        'vlan_mode',
        'vlan_ids',
        'poe',
        'speed_mbps',
        'description',
    ];

    protected $casts = [
        'admin_up' => 'boolean',
        'oper_up' => 'boolean',
        'poe' => 'boolean',
    ];

    // Relationships
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }
}
