<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
    ];

    public function tutors()
    {
        return $this->belongsToMany(User::class, 'tutor_units', 'unit_id', 'tutor_id')
            ->withPivot('proficiency_level', 'is_tutor')
            ->wherePivot('is_tutor', true);
    }

    public function tutingSessions()
    {
        return $this->hasMany(TutingSession::class, 'unit_id');
    }
}
