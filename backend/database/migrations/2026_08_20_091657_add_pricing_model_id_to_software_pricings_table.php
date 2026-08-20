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
        Schema::table('software_pricings', function (Blueprint $table) {
            $table->string('pricing_type')->after('software_id');
            $table->decimal('price', 12, 2)->nullable()->after('pricing_type');
            $table->string('currency', 10)->default('USD')->after('price');
            $table->string('billing_period')->nullable()->after('currency');
            $table->text('description')->nullable()->after('billing_period');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('software_pricings', function (Blueprint $table) {
            $table->dropColumn([
                'pricing_type',
                'price',
                'currency',
                'billing_period',
                'description',
            ]);
        });
    }
};