<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MentorDetails>
 */
class MentorDetailsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mentor_id' => User::where('is_mentor', true)->first()?->id,
            'year_of_study' => $this->faker->randomElement([1, 2, 3, 4, 5]),
            'course' => $this->faker->randomElement([
                'Computer Science',
                'Business Administration',
                'Mechanical Engineering',
                'Medicine',
                'Law',
                'Education',
                'Mathematics',
                'Physics',
                'Chemistry',
                'Economics',
            ]),
            'skills' => $this->faker->randomElement([
                'Python, Java, SQL',
                'Project Management, Leadership',
                'Data Analysis, Excel, Power BI',
                'Web Development, HTML, CSS, JavaScript',
                'Machine Learning, TensorFlow, PyTorch',
                'Public Speaking, Communication',
                'Research, Academic Writing',
                'AutoCAD, SolidWorks',
                'Clinical Research, Patient Care',
                'Legal Research, Contract Drafting',
            ]),
            'hobbies' => $this->faker->randomElement([
                'Reading, Hiking, Chess',
                'Photography, Traveling',
                'Cooking, Painting',
                'Music, Guitar, Singing',
                'Sports, Football, Basketball',
                'Gardening, Yoga',
                'Blogging, Podcasting',
                'Volunteering, Community Service',
                'Cycling, Running',
                'Gaming, Coding Challenges',
            ]),
            'work_experience' => $this->faker->randomElement([
                'Intern at TechCorp for 6 months',
                '2 years as Teaching Assistant',
                'Part-time Web Developer at Startup',
                'Research Assistant in AI Lab',
                'Summer Internship at Law Firm',
                'Volunteer at Local Hospital',
                'Freelance Graphic Designer',
                'Project Lead in University Project',
                'Customer Service at Retail Store',
                'Lab Assistant in Chemistry Department',
            ]),
            'approval_status' => true,
        ];
    }
}
