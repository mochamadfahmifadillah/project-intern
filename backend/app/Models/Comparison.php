<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comparison extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_key',
    ];

    /**
     * User yang membuat comparison.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * Item dalam comparison.
     */
    public function items(): HasMany
    {
        return $this->hasMany(
            ComparisonItem::class,
            'comparison_id'
        );
    }

    /**
     * Software yang dibandingkan.
     */
    public function softwares(): BelongsToMany
    {
        return $this->belongsToMany(
            Software::class,
            'comparison_items',
            'comparison_id',
            'software_id'
        )->withPivot('position');
    }
}