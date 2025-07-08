<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->userName() . '@strathmore.edu',
            'gender' => $this->faker->randomElement(['m', 'f']),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('Laws2017'),
            'remember_token' => Str::random(10),
            'user_type' => $this->faker->randomElement(['standard user', 'admin']),
            'is_tutor' => !empty($this->faker->optional(0.3)->word), // Simulate users with tutor details
            'is_mentor' => !empty($this->faker->optional(0.3)->word), // Simulate users with mentor details
            'bio' => $this->faker->randomElement([
                'Passionate about lifelong learning and sharing knowledge.',
                'Aspiring leader with a love for technology and innovation.',
                'Dedicated to helping others achieve their academic goals.',
                'Enthusiastic about collaborative projects and teamwork.',
                'Always eager to explore new ideas and concepts.',
                'Committed to personal growth and community engagement.',
                'Enjoys mentoring and supporting fellow students.',
                'Driven by curiosity and a desire to make a difference.',
                'Believes in the power of education to transform lives.',
                'Focused on building meaningful connections and networks.',
            ]),
            'pfp' => 'pfps/defaultpfp.png',
            'student_id' => 'ids/defaultStudentId.pdf',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
