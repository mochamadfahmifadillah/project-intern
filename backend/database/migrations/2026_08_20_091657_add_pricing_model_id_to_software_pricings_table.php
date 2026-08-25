<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('software_pricings', function (Blueprint $table) {
            $table->unsignedBigInteger('pricing_model_id')
                ->nullable()
                ->after('software_id');
        });

        $models = [
            [
                'name' => 'Free',
                'slug' => 'free',
                'description' => 'Software yang dapat digunakan secara gratis.',
            ],
            [
                'name' => 'Freemium',
                'slug' => 'freemium',
                'description' => 'Software dengan fitur dasar gratis dan fitur premium berbayar.',
            ],
            [
                'name' => 'Paid',
                'slug' => 'paid',
                'description' => 'Software yang membutuhkan pembayaran.',
            ],
            [
                'name' => 'Custom',
                'slug' => 'custom',
                'description' => 'Pricing berdasarkan kebutuhan atau penawaran khusus.',
            ],
        ];

        foreach ($models as $model) {
            DB::table('pricing_models')->updateOrInsert(
                ['slug' => $model['slug']],
                [
                    'name' => $model['name'],
                    'description' => $model['description'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        DB::statement('
            UPDATE software_pricings sp
            SET pricing_model_id = pm.id
            FROM pricing_models pm
            WHERE pm.slug = sp.pricing_type
        ');

        Schema::table('software_pricings', function (Blueprint $table) {
            $table->foreign('pricing_model_id')
                ->references('id')
                ->on('pricing_models')
                ->restrictOnDelete();
        });

        DB::statement('
            ALTER TABLE software_pricings
            ALTER COLUMN pricing_model_id SET NOT NULL
        ');
    }

    public function down(): void
    {
        Schema::table('software_pricings', function (Blueprint $table) {
            $table->dropForeign(['pricing_model_id']);
            $table->dropColumn('pricing_model_id');
        });
    }
};