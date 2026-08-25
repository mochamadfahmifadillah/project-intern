<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('outbound_clicks', function (Blueprint $table) {
            $table->id();

            // User yang melakukan klik
            // Nullable karena visitor juga bisa melakukan outbound click
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // Software yang menjadi sumber outbound click
            $table->foreignId('software_id')
                ->constrained('softwares')
                ->restrictOnDelete();

            // Vendor tujuan
            $table->foreignId('vendor_id')
                ->nullable()
                ->constrained('vendors')
                ->nullOnDelete();

            // Session visitor/user
            $table->string('session_id')->nullable()->index();

            // Target/link yang diklik
            $table->text('target_url');

            // Identifier untuk membedakan jenis CTA/link
            // Contoh: visit_vendor, affiliate, pricing, demo
            $table->string('link_identifier')->nullable();

            // Waktu outbound click
            $table->timestamp('clicked_at');

            $table->timestamps();

            // Query optimization
            $table->index('user_id');
            $table->index('software_id');
            $table->index('vendor_id');
            $table->index('clicked_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('outbound_clicks');
    }
};