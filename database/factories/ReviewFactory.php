<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TutingSession;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_id' => TutingSession::inRandomOrder()->first()?->id,
            'reviewer_id' => User::where('is_tutor', false)->inRandomOrder()->first()?->id,
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->randomElement([
                'Great session, learned a lot!',
                'The tutor was very helpful and patient.',
                'I enjoyed the session and understood the topic better.',
                'Could have been more interactive.',
                'Excellent explanation and guidance.',
                'The session was okay, but a bit rushed.',
                'Very knowledgeable tutor!',
                'Helped me solve my doubts quickly.',
                'Would recommend to others.',
                'Looking forward to more sessions like this.'
            ]),
        ];
    }
}
