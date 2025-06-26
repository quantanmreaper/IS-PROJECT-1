<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('course_purchases', function (Blueprint $table) {
            $table->string('status')->default('pending');
            $table->string('transaction_ref')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('course_purchases', function (Blueprint $table) {
            $table->dropColumn(['status', 'transaction_ref']);
        });
    }
};
