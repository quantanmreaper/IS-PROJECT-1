<?php

namespace Database\Factories;

use App\Models\TutorUnit;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Unit;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TutorUnit>
 */
class TutorUnitFactory extends Factory
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
            'unit_id' => Unit::inRandomOrder()->first()?->id,
            'proficiency_level' => $this->faker->numberBetween(1, 3),
        ];
    }
}
