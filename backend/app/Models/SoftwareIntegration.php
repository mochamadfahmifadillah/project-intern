<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SoftwareIntegration extends Model
{
    protected $fillable = [
        'software_id',
        'name',
        'type',
        'description',
        'website_url',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function software(): BelongsTo
    {
        return $this->belongsTo(Software::class);
    }
}