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
        // Ensure at least 5 tutors exist
        $tutors = \App\Models\User::factory()->count(5)->create(['is_tutor' => true]);
        // Ensure at least 3 mentors exist
        $mentors = \App\Models\User::factory()->count(3)->create(['is_mentor' => true]);
        // Create other users
        \App\Models\User::factory()->count(2)->create();
        Unit::factory()->count(10)->create();
        TutorUnit::factory()->count(15)->create();
        TutorDetails::factory()->count(4)->create();
        MentorDetails::factory()->count(3)->create();
        // Courses and related
        \App\Models\Course::factory()->count(5)->create();
        \App\Models\CourseSection::factory()->count(10)->create();
        \App\Models\Lesson::factory()->count(25)->create();
        \App\Models\CoursePurchase::factory()->count(10)->create();
        // Seed unique course reviews
        $userIds = \App\Models\User::pluck('id')->toArray();
        $courseIds = \App\Models\Course::pluck('id')->toArray();
        $reviewPairs = collect($userIds)
            ->crossJoin($courseIds)
            ->shuffle()
            ->take(10);
        foreach ($reviewPairs as [$userId, $courseId]) {
            \App\Models\CourseReview::factory()->create([
                'user_id' => $userId,
                'course_id' => $courseId,
            ]);
        }
        // Sessions, reviews, messages
        TutingSession::factory()->count(20)->create();
        Review::factory()->count(20)->create();
        Message::factory()->count(50)->create();
    }
}
