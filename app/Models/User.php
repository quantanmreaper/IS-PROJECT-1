<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
        'is_tutor',
        'bio',
        'pfp',
        'phone_number', // ensure phone_number is fillable
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the tutor details associated with the user.
     */
    public function TutorDetails()
    {
        return $this->hasOne(TutorDetails::class, 'tutor_id');
    }

    /**
     * Get the mentor details associated with the user.
     */
    public function MentorDetails()
    {
        return $this->hasMany(MentorDetails::class, 'mentor_id');
    }

    /**
     * The units that belong to the user.
     */
    public function units()
    {
        return $this->belongsToMany(Unit::class, 'tutor_units', 'tutor_id', 'unit_id')
            ->withPivot('proficiency_level'); // Remove select() for compatibility with Eloquent eager loading
    }

    /**
     * Tutoring sessions where the user is the tutor.
     */
    public function tutorTutingSessions()
    {
        return $this->hasMany(TutingSession::class, 'tutor_id');
    }

    /**
     * Tutoring sessions where the user is the tutee.
     */
    public function tuteeTutingSessions()
    {
        return $this->hasMany(TutingSession::class, 'tutee_id');
    }

    /**
     * Courses this user is selling (as a tutor/instructor or creator)
     */
    public function soldCourses()
    {
        return $this->hasMany(Course::class, 'user_id');
    }

    /**
     * Courses this user has purchased
     */
    public function purchasedCourses()
    {
        return $this->belongsToMany(Course::class, 'course_purchases')
            ->withPivot('amount', 'purchased_at')
            ->withTimestamps();
    }

    /**
     * Course purchase records for this user
     */
    public function coursePurchases()
    {
        return $this->hasMany(CoursePurchase::class);
    }

    /**
     * Course reviews written by this user
     */
    public function courseReviews()
    {
        return $this->hasMany(CourseReview::class);
    }

    /**
     * General reviews written by this user (for sessions, etc)
     */
    public function reviews()
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }

    /**
     * Messages sent by this user
     */
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Messages received by this user
     */
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'recepient_id');
    }

    /**
     * Get the user's phone number.
     */
    public function getPhoneNumberAttribute($value)
    {
        return $value;
    }


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
