<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PricingModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Software pricing yang menggunakan pricing model ini.
     */
    public function softwarePricings(): HasMany
    {
        return $this->hasMany(
            SoftwarePricing::class,
            'pricing_model_id'
        );
    }
}