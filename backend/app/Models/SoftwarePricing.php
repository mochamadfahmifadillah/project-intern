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
        'pricing_model_id',
        'price',
        'description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    /**
     * Software yang memiliki pricing ini.
     */
    public function software(): BelongsTo
    {
        return $this->belongsTo(
            Software::class,
            'software_id'
        );
    }

    /**
     * Pricing model yang digunakan.
     */
    public function pricingModel(): BelongsTo
    {
        return $this->belongsTo(
            PricingModel::class,
            'pricing_model_id'
        );
    }
}