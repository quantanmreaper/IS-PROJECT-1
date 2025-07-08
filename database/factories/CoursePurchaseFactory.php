<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Course;

class CoursePurchaseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'course_id' => Course::inRandomOrder()->first()?->id,
            'amount' => $this->faker->randomFloat(2, 100, 2000),
            'purchased_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
