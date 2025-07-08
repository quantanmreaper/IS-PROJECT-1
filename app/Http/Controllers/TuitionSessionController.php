<?php

namespace App\Http\Controllers;

use App\Models\TutingSession;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TuitionSessionController extends Controller
{
    public function index()
    {
        // Get all sessions for the logged-in user (as tutee)
        $sessions = TutingSession::where('tutee_id', auth()->id())
            ->with(['tutor', 'unit', 'reviews' => function ($query) {
                $query->where('reviewer_id', auth()->id());
            }])
            ->orderBy('scheduled_start', 'desc')
            ->get();

        return Inertia::render('TuitionSessions/Index', [
            'sessions' => $sessions
        ]);
    }

    public function markComplete(Request $request, TutingSession $session)
{
    // Ensure the user owns this session
    if ($session->tutee_id !== auth()->id()) {
        return redirect()->back()->with('error', 'Unauthorized action');
    }

    // Update the session with completion_status set to true
    $session->update([
        'completion_status' => true,
    ]);

    return redirect()->back()->with('success', 'Session marked as completed');
}
    public function storeReview(Request $request, TutingSession $session)
    {
        // Validate the request
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:500',
        ]);

        // Check if user already reviewed this session
        $existingReview = Review::where('session_id', $session->id)
            ->where('reviewer_id', auth()->id())
            ->first();

        if ($existingReview) {
            // Update existing review
            $existingReview->update($validated);
            $message = 'Review updated successfully';
        } else {
            // Create new review
            Review::create([
                'session_id' => $session->id,
                'reviewer_id' => auth()->id(),
                'rating' => $validated['rating'],
                'comment' => $validated['comment'],
            ]);
            $message = 'Review submitted successfully';
        }

        return redirect()->back()->with('success', $message);
    }
}
