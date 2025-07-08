<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Course;

class CourseReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'course_id' => Course::inRandomOrder()->first()?->id,
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->randomElement([
                'Great course, learned a lot!',
                'Very informative and well structured.',
                'The instructor explained concepts clearly.',
                'I enjoyed the practical examples.',
                'Could use more real-world applications.',
                'Challenging but rewarding.',
                'Would recommend to others.',
                'Some topics were a bit rushed.',
                'Excellent resources and materials.',
                'Helped me improve my skills.'
            ]),
        ];
    }
}
