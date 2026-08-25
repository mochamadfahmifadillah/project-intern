<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('implementation_requests', function (Blueprint $table) {
            $table->id();

            // User yang mengajukan request
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Software yang ingin diimplementasikan
            $table->foreignId('software_id')
                ->constrained('softwares')
                ->restrictOnDelete();

            // Admin/partner yang menangani lead
            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // Informasi perusahaan
            $table->string('company_name');
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('contact_phone')->nullable();

            // Detail kebutuhan implementasi
            $table->text('project_requirements')->nullable();
            $table->text('additional_notes')->nullable();

            // Lead workflow
            $table->enum('status', [
                'new',
                'assigned',
                'contacted',
                'qualified',
                'proposal_sent',
                'won',
                'lost',
            ])->default('new');

            // Timestamp ketika lead ditangani
            $table->timestamp('contacted_at')->nullable();
            $table->timestamp('qualified_at')->nullable();
            $table->timestamp('closed_at')->nullable();

            $table->timestamps();

            // Index untuk kebutuhan admin dashboard/filter
            $table->index('status');
            $table->index('assigned_to');
            $table->index('software_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('implementation_requests');
    }
};