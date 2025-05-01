<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use \App\Models\User;
use App\Models\Unit;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TutingSession>
 */
class TutingSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tutor_id' => User::where('is_tutor', true)->inRandomOrder()->first()?->id,
            'tutee_id' => User::where('is_tutor', false)->inRandomOrder()->first()?->id,
            'unit_id' => Unit::inRandomOrder()->first()?->id,
            'scheduled_start' => $start = Carbon::now()->addDays(rand(1, 10))->setTime(rand(8, 16), 0),
            'scheduled_stop' => (clone $start)->addHours(1),
            'actual_start' => (clone $start)->addMinutes(rand(-5, 5)),
            'actual_stop' => (clone $start)->addMinutes(60 + rand(-5, 15)),
        ];
    }
}
