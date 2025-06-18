<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonsMigration extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_section_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->enum('content_type', ['video', 'pdf', 'text', 'quiz']);
            $table->text('content')->nullable(); // Can be URL, HTML, or structured data
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
}
