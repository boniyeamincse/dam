<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contract extends Model
{
    protected $fillable = [
        'vendor_id',
        'title',
        'contract_no',
        'type',
        'start_on',
        'end_on',
        'auto_renew',
        'renewal_term_months',
        'amount',
        'currency',
        'billing_cycle',
        'cost_center',
        'po_number',
        'invoice_email',
        'termination_notice_days',
        'status',
    ];

    protected $casts = [
        'start_on' => 'date',
        'end_on' => 'date',
        'auto_renew' => 'boolean',
        'amount' => 'decimal:2',
    ];

    // Relationships
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    // Accessors
    public function getDaysUntilExpiryAttribute()
    {
        return now()->diffInDays($this->end_on, false);
    }

    public function getIsExpiringSoonAttribute()
    {
        return $this->days_until_expiry <= 90 && $this->days_until_expiry >= 0;
    }

    public function getNextRenewalDateAttribute()
    {
        if (!$this->auto_renew || !$this->renewal_term_months) {
            return null;
        }

        return $this->end_on->addMonths($this->renewal_term_months);
    }
}
