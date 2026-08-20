<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Software extends Model
{
    use HasFactory;

    protected $table = 'softwares';

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'website_url',
        'logo',
        'status',
    ];

    /**
     * Route Model Binding
     *
     * Gunakan slug sebagai parameter route,
     * bukan ID.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Software Category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(
            SoftwareCategory::class,
            'category_id'
        );
    }

    /**
     * Software Features
     */
    public function features(): HasMany
    {
        return $this->hasMany(
            SoftwareFeature::class
        );
    }

    /**
     * Software Pricings
     */
    public function pricings(): HasMany
    {
        return $this->hasMany(
            SoftwarePricing::class
        );
    }

    /**
     * Software Integrations
     */
    public function integrations(): HasMany
    {
        return $this->hasMany(
            SoftwareIntegration::class
        );
    }

    /**
     * Software Reviews
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(
            SoftwareReview::class
        );
    }

    /**
     * Software Ratings
     */
    public function ratings(): HasMany
    {
        return $this->hasMany(
            SoftwareRating::class
        );
    }
}