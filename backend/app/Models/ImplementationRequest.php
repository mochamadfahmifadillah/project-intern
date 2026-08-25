<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImplementationRequest extends Model
{
    use HasFactory;

    protected $table = 'implementation_requests';

    protected $fillable = [
        'user_id',
        'software_id',
        'assigned_to',
        'company_name',
        'contact_name',
        'contact_email',
        'contact_phone',
        'project_requirements',
        'additional_notes',
        'status',
        'contacted_at',
        'qualified_at',
        'closed_at',
    ];

    protected $casts = [
        'contacted_at' => 'datetime',
        'qualified_at' => 'datetime',
        'closed_at' => 'datetime',
    ];

    /**
     * User yang mengajukan implementation request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * Software yang ingin diimplementasikan.
     */
    public function software(): BelongsTo
    {
        return $this->belongsTo(
            Software::class,
            'software_id'
        );
    }

    /**
     * Admin/partner yang menangani lead.
     */
    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'assigned_to'
        );
    }
}