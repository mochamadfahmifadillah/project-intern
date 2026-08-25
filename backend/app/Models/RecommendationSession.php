<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RecommendationSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'answers',
    ];

    protected $casts = [
        'answers' => 'array',
    ];

    /**
     * User yang menjalankan recommendation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * Hasil recommendation.
     */
    public function results(): HasMany
    {
        return $this->hasMany(
            RecommendationResult::class,
            'recommendation_session_id'
        );
    }
}