<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SoftwareRating extends Model
{
    use HasFactory;

    protected $table = 'software_ratings';

    protected $fillable = [
        'software_id',
        'user_id',
        'rating',
    ];

    /*
    |--------------------------------------------------------------------------
    | Software
    |--------------------------------------------------------------------------
    */

    public function software(): BelongsTo
    {
        return $this->belongsTo(
            Software::class,
            'software_id'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | User
    |--------------------------------------------------------------------------
    */

    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }
}
