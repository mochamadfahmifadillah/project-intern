<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImplementationRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'contact_name',
        'email',
        'phone',
        'project_requirement',
        'status',
        'assigned_to',
    ];

    /**
     * User yang membuat implementation request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * Admin yang menangani lead.
     */
    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'assigned_to'
        );
    }
}