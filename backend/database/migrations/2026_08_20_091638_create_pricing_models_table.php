Schema::create('software_pricings', function (Blueprint $table) {
    $table->id();

    $table->foreignId('software_id')
        ->constrained('softwares')
        ->cascadeOnDelete();

    $table->foreignId('pricing_model_id')
        ->constrained('pricing_models')
        ->restrictOnDelete();

    $table->decimal('price', 15, 2)->nullable();

    $table->text('description')->nullable();

    $table->timestamps();
});