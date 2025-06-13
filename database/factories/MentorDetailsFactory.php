<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MentorDetails>
 */
class MentorDetailsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mentor_id' => User::where('is_mentor', true)->first()?->id,
            'year_of_study' => $this->faker->randomElement([1, 2, 3, 4, 5]),
            'course' => $this->faker->randomElement([
                'Computer Science',
                'Business Administration',
                'Mechanical Engineering',
                'Medicine',
                'Law',
                'Education',
                'Mathematics',
                'Physics',
                'Chemistry',
                'Economics',
            ]),
            'skills' => $this->faker->text(20),
            'hobbies' => $this->faker->text(20),
            'work_experience' => $this->faker->text(50),
            'approval_status' => true,
        ];
    }
}
