<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('software_integrations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->string('name');
            $table->string('type')->nullable();
            $table->text('description')->nullable();
            $table->string('website_url')->nullable();
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('software_integrations');
    }
};