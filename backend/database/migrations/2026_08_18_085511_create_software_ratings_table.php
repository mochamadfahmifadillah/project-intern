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
        Schema::create('software_ratings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->unsignedTinyInteger('rating');

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | Prevent duplicate rating
            |--------------------------------------------------------------------------
            |
            | Satu user hanya boleh memiliki satu rating
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
        Schema::dropIfExists('software_ratings');
    }
};
