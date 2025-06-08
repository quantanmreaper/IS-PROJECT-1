<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorDetails extends Model
{
    protected $fillable = [
        'year_of_study',
        'course',
        'skills',
        'hobbies',
        'work_experience',
        'approval_status',
    ];
    public function Mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }
}
