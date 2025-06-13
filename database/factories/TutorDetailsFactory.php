<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TutorDetails>
 */
class TutorDetailsFactory extends Factory
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
            'progress_report' => 'defaultFile.pdf',
            'approval_status' => true,
            'hourly_rate' => $this->faker->numberBetween(500, 2000),
            'availability_start' => '08:00',
            'availability_stop' => '16:00',
        ];
    }
}
