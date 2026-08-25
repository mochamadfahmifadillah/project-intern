<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Industry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Software yang termasuk dalam industry ini.
     */
    public function softwares(): BelongsToMany
    {
        return $this->belongsToMany(
            Software::class,
            'industry_software',
            'industry_id',
            'software_id'
        );
    }
}