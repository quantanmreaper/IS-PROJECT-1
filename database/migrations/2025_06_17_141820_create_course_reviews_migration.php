<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseReviewsTable extends Migration
{
    public function up(): void
    {
        Schema::create('course_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // reviewer
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('rating')->unsigned(); // 1–5
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'course_id']); // 1 review per user per course
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_reviews');
    }
}
