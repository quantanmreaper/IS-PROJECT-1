<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'title' => $this->faker->catchPhrase(),
            'description' => $this->faker->paragraph(3),
            'thumbnail' => "course-thumbnails/defaultthumbnail.jpg",
            'price' => $this->faker->randomFloat(2, 10, 2000),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
        ];
    }
}
