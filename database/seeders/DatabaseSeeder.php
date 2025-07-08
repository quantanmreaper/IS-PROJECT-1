<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\TutingSession;
use App\Models\TutorUnit;
use App\Models\User;
use App\Models\Unit;
use App\Models\Message;
use App\Models\TutorDetails;
use App\Models\MentorDetails;
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
        TutorUnit::factory()->count(20)->create();
        TutorDetails::factory()->count(10)->create();
        MentorDetails::factory()->count(10)->create();
        // Courses and related
        \App\Models\Course::factory()->count(20)->create();
        \App\Models\CourseSection::factory()->count(40)->create();
        \App\Models\Lesson::factory()->count(100)->create();
        \App\Models\CoursePurchase::factory()->count(30)->create();
        \App\Models\CourseReview::factory()->count(50)->create();
        // Sessions, reviews, messages
        TutingSession::factory()->count(100)->create();
        Review::factory()->count(100)->create();
        Message::factory()->count(500)->create();
    }
}
