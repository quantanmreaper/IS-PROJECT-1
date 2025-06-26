<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'thumbnail',
        'price',
        'status',
    ];

    public function seller()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sections()
    {
        return $this->hasMany(CourseSection::class)->orderBy('order');
    }

    public function purchases()
    {
        return $this->hasMany(CoursePurchase::class);
    }

    public function reviews()
    {
        return $this->hasMany(CourseReview::class);
    }

    public function buyers()
    {
        return $this->belongsToMany(User::class, 'course_purchases')
            ->withPivot('amount', 'purchased_at')
            ->withTimestamps();
    }

    public function hasPurchased($userId)
    {
        return $this->purchases()->where('user_id', $userId)->where('status', 'paid')->exists();
    }
}
