<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BusinessSize extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Software yang cocok dengan business size ini.
     */
    public function softwares(): BelongsToMany
    {
        return $this->belongsToMany(
            Software::class,
            'business_size_software',
            'business_size_id',
            'software_id'
        );
    }
}