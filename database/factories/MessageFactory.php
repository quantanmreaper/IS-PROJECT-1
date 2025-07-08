<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sender = User::inRandomOrder()->first();
        $recipient = User::where('id', '!=', $sender?->id)->inRandomOrder()->first();

        return [
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'message' => $this->faker->randomElement([
                'Hello!',
                'How are you?',
                'What are you working on?',
                'Let\'s catch up soon.',
                'Can you help me with this?',
                'Thank you!',
                'See you tomorrow.',
                'Good morning!',
                'Good night!',
                'Congratulations!',
                'That sounds great!',
                'I will get back to you.',
                'Let me know if you need anything.',
                'I appreciate your help.',
                'Looking forward to it!',
            ]),
        ];
    }
}
