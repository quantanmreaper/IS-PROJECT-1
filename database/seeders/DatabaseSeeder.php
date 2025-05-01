<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\TutingSession;
use App\Models\TutorUnit;
use App\Models\User;
use App\Models\Unit;
use App\Models\Message;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->count(50)->create();
        Unit::factory()->count(15)->create();
        TutorUnit::factory()->count(50)->create();
        TutingSession::factory()->count(100)->create();
        Review::factory()->count(100)->create();
        Message::factory()->count(500)->create();
    }
}
