<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $unitNames = [
            'Introduction to Computer Science',
            'Calculus I',
            'Physics for Engineers',
            'Principles of Economics',
            'Organic Chemistry',
            'World History',
            'Linear Algebra',
            'Introduction to Psychology',
            'Data Structures and Algorithms',
            'Microbiology',
            'Marketing Fundamentals',
            'Financial Accounting',
            'Human Anatomy',
            'Sociology Basics',
            'Discrete Mathematics',
            'Environmental Science',
            'Business Law',
            'Statistics',
            'Philosophy of Science',
            'Software Engineering'
        ];

        return [
            'name' => $this->faker->randomElement($unitNames),
            'description' => $this->faker->text(150),
        ];
    }
}
