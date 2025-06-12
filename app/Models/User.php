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
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function TutorDetails()
    {
        return $this->hasOne(TutorDetails::class, 'tutor_id');
    }

    public function MentorDetails()
    {
        return $this->hasMany(MentorDetails::class, 'mentor_id');
    }

    public function units()
    {
        return $this->belongsToMany(Unit::class, 'tutor_units', 'tutor_id', 'unit_id')
            ->withPivot('proficiency_level');
    }

    public function tutorTutingSessions()
    {
        return $this->hasMany(TutingSession::class, 'tutor_id');
    }

    public function tuteeTutingSessions()
    {
        return $this->hasMany(TutingSession::class, 'tutee_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'recepient_id');
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
