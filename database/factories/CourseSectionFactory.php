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
            'title' => $this->faker->randomElement([
                'Introduction',
                'Getting Started',
                'Basics',
                'Advanced Topics',
                'Summary',
                'Overview',
                'Module 1',
                'Module 2',
                'Final Thoughts',
                'Conclusion',
                'Resources',
                'Case Studies',
                'Practical Applications',
                'Theory and Practice',
                'Assessment',
            ]),
            'order' => $this->faker->unique()->numberBetween(1, 20),
        ];
    }
}
