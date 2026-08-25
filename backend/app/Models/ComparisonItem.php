<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComparisonItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'comparison_id',
        'software_id',
    ];

    /**
     * Comparison parent.
     */
    public function comparison(): BelongsTo
    {
        return $this->belongsTo(
            Comparison::class,
            'comparison_id'
        );
    }

    /**
     * Software yang dibandingkan.
     */
    public function software(): BelongsTo
    {
        return $this->belongsTo(
            Software::class,
            'software_id'
        );
    }
}