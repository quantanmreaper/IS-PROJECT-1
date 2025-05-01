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
        return [
            'sender_id' => $sender = User::inRandomOrder()->first()?->id,
            'recepient_id' => User::where('id', '!=', $sender?->id)->inRandomOrder()->first()?->id,
            'message' => $this->faker->text(255),
        ];
    }
}
