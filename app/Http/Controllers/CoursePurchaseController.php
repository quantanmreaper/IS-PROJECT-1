<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CoursePurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CoursePurchaseController extends Controller
{
    // Initiate payment for a course
    public function purchase(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);
        $user = Auth::user();
        if ($course->price <= 0) {
            // Free course: just create purchase record
            CoursePurchase::firstOrCreate([
                'user_id' => $user->id,
                'course_id' => $course->id,
            ], [
                'amount' => 0,
                'status' => 'paid',
            ]);
            return response()->json(['success' => true, 'message' => 'Enrolled for free.']);
        }
        // Paid course: initiate IntaSend payment
        $intasend = new \App\Services\IntaSendCheckoutService();
        $host = config('app.url');
        $redirectUrl = route('courses.payment.callback', $course->id);
        $refOrderNumber = 'course_' . $course->id . '_' . uniqid();
        $userName = $user->name;
        $userEmail = $user->email;
        $userPhone = $user->phone_number ?? '';
        try {
            $resp = $intasend->createCheckout(
                $course->price,
                'KES',
                $userName,
                $userEmail,
                $userPhone,
                $host,
                $redirectUrl,
                $refOrderNumber
            );
            // Optionally, create a pending purchase record here
            CoursePurchase::updateOrCreate([
                'user_id' => $user->id,
                'course_id' => $course->id,
            ], [
                'amount' => $course->price,
                'status' => 'pending',
                'transaction_ref' => $refOrderNumber,
            ]);
            return response()->json(['redirect' => $resp->url]);
        } catch (\Exception $e) {
            Log::error('Course payment initiation failed', [
                'error' => $e->getMessage(),
                'course_id' => $course->id,
                'user_id' => $user->id,
            ]);
            return response()->json(['error' => 'Failed to initiate payment. Please try again.'], 500);
        }
    }

    // Handle payment callback
    public function callback(Request $request, $courseId)
    {
        $user = Auth::user();
        $course = Course::findOrFail($courseId);
        // Mark purchase as paid (in real app, verify payment with IntaSend API)
        $purchase = CoursePurchase::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();
        if ($purchase) {
            $purchase->status = 'paid';
            $purchase->purchased_at = now();
            $purchase->save();
        }
        return Inertia::render('Courses/ViewCourse', [
            'course' => $course->load(['seller', 'sections.lessons', 'reviews.user'])
        ]);
    }
}
