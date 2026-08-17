<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('software_features', function (Blueprint $table) {
            $table->id();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->string('name');
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('software_features');
    }
};