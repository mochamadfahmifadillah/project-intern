<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RecommendationResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'recommendation_session_id',
        'software_id',
        'score',
        'rank',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'rank' => 'integer',
    ];

    /**
     * Recommendation session.
     */
    public function session(): BelongsTo
    {
        return $this->belongsTo(
            RecommendationSession::class,
            'recommendation_session_id'
        );
    }

    /**
     * Software yang direkomendasikan.
     */
    public function software(): BelongsTo
    {
        return $this->belongsTo(
            Software::class,
            'software_id'
        );
    }
}