<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_size_software', function (Blueprint $table) {
            $table->id();

            $table->foreignId('business_size_id')
                ->constrained('business_sizes')
                ->cascadeOnDelete();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->unique(['business_size_id', 'software_id']);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_size_software');
    }
};