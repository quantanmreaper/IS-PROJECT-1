<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Course;

class CoursePurchaseFactory extends Factory
{
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();
        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'course_id' => $course?->id,
            'amount' => $course?->price ?? 0,
            'purchased_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
