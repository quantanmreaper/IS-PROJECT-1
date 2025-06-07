<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->char('gender', 1)->nullable()->after('email');
            $table->string('student_id')->after('pfp')->nullable();
        });

        $users = DB::table('users')->select('id')->get();

        foreach ($users as $index => $user) {
            $gender = $index % 2 === 0 ? 'm' : 'f';
            DB::table('users')->where('id', $user->id)->update([
                'gender' => $gender,
                'student_id' => 'defaultStudentId.pdf'
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('gender');
            $table->dropColumn('student_id');
        });
    }
};
