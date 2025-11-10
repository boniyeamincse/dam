<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subnet extends Model
{
    protected $fillable = [
        'network',
        'mask',
        'name',
        'description',
    ];
}
