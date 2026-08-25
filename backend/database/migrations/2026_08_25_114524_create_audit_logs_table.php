<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();

            // User yang melakukan aktivitas
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // Aktivitas yang dilakukan
            // Contoh:
            // created, updated, deleted, approved, rejected,
            // login, logout, assigned, status_changed
            $table->string('action');

            // Nama entity/model yang terkena perubahan
            // Contoh: Software, Review, User, Lead
            $table->string('auditable_type')->nullable();

            // ID record yang terkena perubahan
            $table->unsignedBigInteger('auditable_id')->nullable();

            // Data sebelum perubahan
            $table->json('old_values')->nullable();

            // Data setelah perubahan
            $table->json('new_values')->nullable();

            // Informasi request
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();

            // Optional endpoint/request information
            $table->string('url')->nullable();
            $table->string('method', 10)->nullable();

            $table->timestamps();

            // Query optimization
            $table->index('user_id');
            $table->index('action');
            $table->index(['auditable_type', 'auditable_id']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};