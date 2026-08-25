<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comparison extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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
     * Software yang terdapat dalam comparison.
     */
    public function items(): HasMany
    {
        return $this->hasMany(
            ComparisonItem::class,
            'comparison_id'
        );
    }
}