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
        Schema::table('tuting_sessions', function (Blueprint $table) {
            $table->boolean('acceptance')->default(false)->after('scheduled_stop');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tuting_sessions', function (Blueprint $table) {
            $table->dropColumn('acceptance');
        });
    }
};
