<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('industry_software', function (Blueprint $table) {
            $table->id();

            $table->foreignId('industry_id')
                ->constrained('industries')
                ->cascadeOnDelete();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->unique(['industry_id', 'software_id']);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('industry_software');
    }
};