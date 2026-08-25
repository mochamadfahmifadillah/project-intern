<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
            SoftwareFeature::class,
            'software_id'
        );
    }

    /**
     * Software Pricings
     */
    public function pricings(): HasMany
    {
        return $this->hasMany(
            SoftwarePricing::class,
            'software_id'
        );
    }

    /**
     * Software Integrations
     */
    public function integrations(): HasMany
    {
        return $this->hasMany(
            SoftwareIntegration::class,
            'software_id'
        );
    }

    /**
     * Software Reviews
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(
            SoftwareReview::class,
            'software_id'
        );
    }

    /**
     * Software Ratings
     */
    public function ratings(): HasMany
    {
        return $this->hasMany(
            SoftwareRating::class,
            'software_id'
        );
    }

    /**
     * Industries
     *
     * Relasi many-to-many melalui industry_software.
     */
    public function industries(): BelongsToMany
    {
        return $this->belongsToMany(
            Industry::class,
            'industry_software',
            'software_id',
            'industry_id'
        );
    }

    /**
     * Business Sizes
     *
     * Relasi many-to-many melalui business_size_software.
     */
    public function businessSizes(): BelongsToMany
    {
        return $this->belongsToMany(
            BusinessSize::class,
            'business_size_software',
            'software_id',
            'business_size_id'
        );
    }

    /**
     * Saved Software
     *
     * Relasi dengan software yang disimpan oleh user.
     */
    public function savedSoftwares(): HasMany
    {
        return $this->hasMany(
            SavedSoftware::class,
            'software_id'
        );
    }

    /**
     * Comparison Items
     *
     * Software yang digunakan dalam comparison.
     */
    public function comparisonItems(): HasMany
    {
        return $this->hasMany(
            ComparisonItem::class,
            'software_id'
        );
    }

    /**
     * Recommendation Results
     *
     * Hasil recommendation yang mengarah ke software ini.
     */
    public function recommendationResults(): HasMany
    {
        return $this->hasMany(
            RecommendationResult::class,
            'software_id'
        );
    }

    /**
     * Implementation Requests
     *
     * Implementation request yang berkaitan dengan software.
     *
     * Catatan:
     * Relasi ini hanya digunakan jika tabel
     * implementation_requests memiliki software_id.
     */
    public function implementationRequests(): HasMany
    {
        return $this->hasMany(
            ImplementationRequest::class,
            'software_id'
        );
    }

    /**
     * Outbound Clicks
     *
     * Tracking outbound/affiliate click dari software.
     */
    public function outboundClicks(): HasMany
    {
        return $this->hasMany(
            OutboundClick::class,
            'software_id'
        );
    }
}