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
        Schema::table('tutor_details', function (Blueprint $table) {
            $table->time('availability_start')->nullable()->after('hourly_rate');
            $table->time('availability_stop')->nullable()->after('availability_start');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutor_details', function (Blueprint $table) {
            $table->dropColumn('availability_start');
            $table->dropColumn('availability_stop');
        });
    }
};
