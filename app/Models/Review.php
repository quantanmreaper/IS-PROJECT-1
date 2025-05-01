<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'session_id',
        'reviewer_id',
        'rating',
        'comment',
    ];

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function tutingSesison()
    {
        return $this->belongsTo(TutingSession::class, 'session_id');
    }

    public function reviewedTutor()
    {
        return $this->hasOneThrough(
            User::class,
            TutingSession::class,
            'id',
            'id',
            'session_id',
            'tutor_id'
        );
    }
}
