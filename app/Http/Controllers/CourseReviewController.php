<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CourseReviewController extends Controller
{
    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request, $courseId)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if user has already reviewed this course
        $existingReview = CourseReview::where('user_id', Auth::id())
            ->where('course_id', $courseId)
            ->first();

        if ($existingReview) {
            // Update existing review
            $existingReview->update([
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]);

            // Load the user relationship
            $existingReview->load('user');
            
            return response()->json([
                'message' => 'Review updated successfully',
                'review' => $existingReview
            ]);
        }

        // Create new review
        $review = CourseReview::create([
            'user_id' => Auth::id(),
            'course_id' => $courseId,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // Load the user relationship
        $review->load('user');
        
        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review
        ]);
    }

    /**
     * Delete a review.
     */
    public function destroy($courseId, $reviewId)
    {
        $review = CourseReview::findOrFail($reviewId);
        
        // Check if user is authorized to delete this review
        if ($review->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $review->delete();
        
        return response()->json(['message' => 'Review deleted successfully']);
    }
} 