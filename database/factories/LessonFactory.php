<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CourseSection;

class LessonFactory extends Factory
{
    public function definition(): array
    {
        $contentType = $this->faker->randomElement(['video', 'pdf', 'text', 'quiz']);
        $content = match ($contentType) {
            'video' => $this->faker->url(),
            'pdf' => $this->faker->url(),
            'text' => $this->faker->paragraphs(2, true),
            'quiz' => json_encode(['question' => $this->faker->sentence(), 'answer' => $this->faker->word()]),
        };
        return [
            'course_section_id' => CourseSection::inRandomOrder()->first()?->id,
            'title' => $this->faker->sentence(4),
            'content_type' => $contentType,
            'content' => $content,
            'order' => $this->faker->unique()->numberBetween(1, 50),
        ];
    }
}
