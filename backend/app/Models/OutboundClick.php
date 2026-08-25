<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OutboundClick extends Model
{
    use HasFactory;

    protected $table = 'outbound_clicks';

    protected $fillable = [
        'user_id',
        'software_id',
        'vendor_id',
        'session_id',
        'target_url',
        'link_identifier',
        'clicked_at',
    ];

    protected $casts = [
        'clicked_at' => 'datetime',
    ];

    /**
     * User yang melakukan outbound click.
     *
     * Nullable karena visitor juga dapat melakukan click.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * Software sumber outbound click.
     */
    public function software(): BelongsTo
    {
        return $this->belongsTo(
            Software::class,
            'software_id'
        );
    }

    /**
     * Vendor tujuan outbound click.
     *
     * Nullable jika click tidak terkait vendor tertentu.
     */
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(
            Vendor::class,
            'vendor_id'
        );
    }
}