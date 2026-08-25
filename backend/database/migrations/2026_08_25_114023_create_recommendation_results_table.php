<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recommendation_results', function (Blueprint $table) {
            $table->id();

            $table->foreignId('recommendation_session_id')
                ->constrained('recommendation_sessions')
                ->cascadeOnDelete();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->decimal('score', 8, 2);

            $table->unsignedInteger('rank');

            $table->json('fit_indicators')
                ->nullable();

            $table->timestamps();

            $table->unique([
                'recommendation_session_id',
                'software_id'
            ]);

            $table->unique([
                'recommendation_session_id',
                'rank'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recommendation_results');
    }
};