<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutingSession extends Model
{
    use HasFactory;

    protected $table = 'tuting_sessions';

    protected $fillable = [
        'tutor_id',
        'tutee_id',
        'unit_id',
        'scheduled_start',
        'scheduled_stop',
        'acceptance',
        'completion_status',
    ];

    protected $casts = [
        'scheduled_start' => 'datetime',
        'scheduled_stop' => 'datetime',
    ];

    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function tutee()
    {
        return $this->belongsTo(User::class, 'tutee_id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'session_id');
    }
}
