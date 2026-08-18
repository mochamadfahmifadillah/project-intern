<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('software_reviews', function (Blueprint $table) {
            $table->id();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->text('review');

            $table->enum('status', [
                'active',
                'hidden',
            ])->default('active');

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | Prevent duplicate review
            |--------------------------------------------------------------------------
            |
            | Satu user hanya boleh memberikan satu review
            | untuk satu software.
            |
            */

            $table->unique([
                'software_id',
                'user_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('software_reviews');
    }
};