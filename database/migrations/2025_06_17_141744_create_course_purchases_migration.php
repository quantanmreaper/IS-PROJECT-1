<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursePurchasesMigration extends Migration
{
    public function up(): void
    {
        Schema::create('course_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // buyer
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->timestamp('purchased_at')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_purchases');
    }
}
