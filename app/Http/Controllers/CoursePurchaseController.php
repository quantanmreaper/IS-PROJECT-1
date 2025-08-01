<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CoursePurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CoursePurchaseController extends Controller
{
    // Initiate payment for a course (step 1: show summary)
    public function purchase(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);
        $user = Auth::user();
        if ($course->price <= 0) {
            CoursePurchase::firstOrCreate([
                'user_id' => $user->id,
                'course_id' => $course->id,
            ], [
                'amount' => 0,
                'status' => 'paid',
            ]);
            return response()->json(['success' => true, 'message' => 'Enrolled for free.']);
        }
        // Try to find an existing pending purchase
        $purchase = CoursePurchase::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->where('status', 'pending')
            ->first();
        if (!$purchase) {
            $refOrderNumber = 'course_' . $course->id . '_' . uniqid();
            $purchase = CoursePurchase::updateOrCreate([
                'user_id' => $user->id,
                'course_id' => $course->id,
            ], [
                'amount' => $course->price,
                'status' => 'paid',
                'transaction_ref' => $refOrderNumber,
            ]);
        }
        // Show payment summary page with the correct transaction_ref
        return Inertia::render('PaymentSummary', [
            'payment' => [
                'item_type' => 'course',
                'item_title' => $course->title,
                'amount' => $course->price,
                'instructor_name' => $course->seller->name,
                'ref' => $purchase->transaction_ref,
                'confirm_url' => route('courses.purchase.confirm', $course->id),
                'cancel_url' => route('courses.show', $course->id),
            ]
        ]);
    }

    // Confirm and actually initiate IntaSend checkout (step 2)
    public function confirm(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);
        $user = Auth::user();
        $purchase = CoursePurchase::where('user_id', $user->id)->where('course_id', $course->id)->firstOrFail();
        $intasend = new \App\Services\IntaSendCheckoutService();
        $host = config('app.url');
        $redirectUrl = route('courses.payment.callback', $course->id);
        try {
            $resp = $intasend->createCheckout(
                $course->price,
                'KES',
                $user->name,
                $user->email,
                $user->phone_number ?? '',
                $host,
                $redirectUrl,
                $purchase->transaction_ref
            );
            // Immediately redirect to IntaSend payment page
            return redirect()->away($resp->url);
        } catch (\Exception $e) {
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
