<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CourseSection;

class LessonFactory extends Factory
{
    public function definition(): array
    {
        $commonTitles = [
            'Introduction to the Course',
            'Getting Started',
            'Key Concepts',
            'Practical Applications',
            'Case Study',
            'Summary and Review',
            'Advanced Techniques',
            'Hands-on Exercise',
            'Frequently Asked Questions',
            'Final Thoughts',
        ];
        $contentType = $this->faker->randomElement(['video', 'text']);
        $content = match ($contentType) {
            'video' => "https://www.youtube.com/watch?v=-_6dHIPVoTM",
            'text' => $this->faker->paragraphs(2, true),
        };
        return [
            'course_section_id' => CourseSection::inRandomOrder()->first()?->id,
            'title' => $this->faker->randomElement($commonTitles),
            'content_type' => $contentType,
            'content' => $content,
            'order' => $this->faker->unique()->numberBetween(1, 50),
        ];
    }
}
