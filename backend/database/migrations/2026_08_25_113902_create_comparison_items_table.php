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
        Schema::create('comparison_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('comparison_id')
                ->constrained('comparisons')
                ->cascadeOnDelete();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->unsignedSmallInteger('position');

            $table->unique(['comparison_id', 'software_id']);
            $table->unique(['comparison_id', 'position']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comparison_items');
    }
};