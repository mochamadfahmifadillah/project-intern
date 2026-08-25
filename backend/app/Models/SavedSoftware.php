<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedSoftware extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'software_id',
    ];

    /**
     * User yang menyimpan software.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * Software yang disimpan.
     */
    public function software(): BelongsTo
    {
        return $this->belongsTo(
            Software::class,
            'software_id'
        );
    }
}