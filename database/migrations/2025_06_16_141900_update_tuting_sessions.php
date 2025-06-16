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
            $table->dateTime('scheduled_start')->nullable()->change();
            $table->dateTime('scheduled_stop')->nullable()->change();
            $table->dateTime('actual_start')->nullable()->change();
            $table->dateTime('actual_stop')->nullable()->change();
            $table->text('notes')->nullable()->after('acceptance');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tuting_sessions', function (Blueprint $table) {
            $table->dateTime('scheduled_start')->change();
            $table->dateTime('scheduled_stop')->change();
            $table->dateTime('actual_start')->change();
            $table->dateTime('actual_stop')->change();
            $table->dropColumn('notes');
        });
    }
};
