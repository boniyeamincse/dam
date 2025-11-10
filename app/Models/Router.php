<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Router extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'asset_tag',
        'vendor',
        'model',
        'serial',
        'location',
        'status',
        'mgmt_ip',
        'hostname',
        'os_firmware',
        'vlan',
        'subnet',
        'purchase_date',
        'warranty_end',
        'notes',
        'last_seen',
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'warranty_end' => 'date',
        'last_seen' => 'datetime',
    ];
}
