<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SoftwarePricing extends Model
{
    use HasFactory;

    protected $fillable = [
        'software_id',
        'pricing_type',
        'price',
        'currency',
        'billing_period',
        'description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function software(): BelongsTo
    {
        return $this->belongsTo(Software::class);
    }
}