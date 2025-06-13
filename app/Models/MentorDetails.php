<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'mentor_id',
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
