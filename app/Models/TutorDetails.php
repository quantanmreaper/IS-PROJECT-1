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
    ];

    public function Tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}
