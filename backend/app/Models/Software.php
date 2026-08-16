<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function category(): BelongsTo
    {
        return $this->belongsTo(
            SoftwareCategory::class,
            'category_id'
        );
    }
}
