<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoursePurchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'amount',
        'purchased_at',
        'status',
        'transaction_ref',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
