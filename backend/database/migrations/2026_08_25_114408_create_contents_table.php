<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();

            // Admin/user yang membuat content
            $table->foreignId('author_id')
                ->constrained('users')
                ->restrictOnDelete();

            // Content information
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('body');

            // Optional cover image
            $table->string('featured_image')->nullable();

            // Content type
            $table->enum('type', [
                'article',
                'tutorial',
                'case_study',
            ])->default('article');

            // Publication lifecycle
            $table->enum('status', [
                'draft',
                'published',
                'archived',
            ])->default('draft');

            // Publication timestamp
            $table->timestamp('published_at')->nullable();

            // SEO metadata
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            $table->timestamps();

            // Query optimization
            $table->index('status');
            $table->index('type');
            $table->index('author_id');
            $table->index('published_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};