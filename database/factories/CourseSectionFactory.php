<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Course;

class CourseSectionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id' => Course::inRandomOrder()->first()?->id,
            'title' => $this->faker->sentence(3),
            'order' => $this->faker->unique()->numberBetween(1, 20),
        ];
    }
}
