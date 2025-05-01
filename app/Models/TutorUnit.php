<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TutorUnit extends Model
{
    protected $table = 'tutor_units';
    protected $fillable = [
        'tutor_id',
        'unit_id',
        'proficiency_level',
    ];

    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }
}
