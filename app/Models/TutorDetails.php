<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class TutorDetails extends Model
{
    protected $fillable = [
        'tutor_id',
        'progress_report',
        'approval_status',
        'hourly_rate',
        'availability_start',
        'availability_stop',
    ];

    public function Tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function units()
    {
        return $this->belongsToMany(Unit::class, 'tutor_units', 'tutor_id', 'unit_id');
    }
}
