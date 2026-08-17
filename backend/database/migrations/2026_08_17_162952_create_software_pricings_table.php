<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('software_pricings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('software_id')
                ->constrained('softwares')
                ->cascadeOnDelete();

            $table->enum('pricing_type', [
                'free',
                'freemium',
                'paid',
                'custom',
            ]);

            $table->decimal('price', 15, 2)->nullable();

            $table->string('currency', 3)->default('USD');

            $table->enum('billing_period', [
                'monthly',
                'yearly',
                'one_time',
                'custom',
            ])->nullable();

            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('software_pricings');
    }
};