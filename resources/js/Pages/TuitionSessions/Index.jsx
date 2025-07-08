import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { format } from "date-fns";

export default function TuitionSessions({ sessions, auth }) {
    const [reviewingSession, setReviewingSession] = useState(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: "",
    });

    const submitReview = (e, sessionId) => {
        e.preventDefault();
        post(route("tuition-sessions.review", sessionId), {
            onSuccess: () => {
                reset();
                setReviewingSession(null);
            },
        });
    };

    const markComplete = (sessionId) => {
        if (confirm("Are you sure you want to mark this session as complete?")) {
            post(route("tuition-sessions.complete", sessionId));
        }
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return "N/A";
        return format(new Date(dateTime), "PPP p"); // Format: Apr 29, 2023, 5:00 PM
    };

    const calculateDuration = (start, stop) => {
        if (!start || !stop) return "N/A";
        
        const startDate = new Date(start);
        const stopDate = new Date(stop);
        const diffInMs = stopDate - startDate;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${diffInHours}h ${diffInMinutes}m`;
    };

    const isSessionCompleted = (session) => {
        return session.completion_status === true;
    };

    const hasReview = (session) => {
        return session.reviews && session.reviews.length > 0;
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Tuition Sessions" />
            <div className="py-12 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">My Tuition Sessions</h1>
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {sessions.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr className="bg-blue-100 text-blue-800">
                                                <th className="py-3 px-4 text-left">Tutor</th>
                                                <th className="py-3 px-4 text-left">Unit</th>
                                                <th className="py-3 px-4 text-left">Date & Time</th>
                                                <th className="py-3 px-4 text-left">Duration</th>
                                                <th className="py-3 px-4 text-left">Status</th>
                                                <th className="py-3 px-4 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sessions.map((session) => (
                                                <React.Fragment key={session.id}>
                                                    <tr className="border-b hover:bg-gray-50">
                                                        <td className="py-3 px-4">{session.tutor?.name || "Unknown"}</td>
                                                        <td className="py-3 px-4">{session.unit?.name || "Unknown"}</td>
                                                        <td className="py-3 px-4">{formatDateTime(session.scheduled_start)}</td>
                                                        <td className="py-3 px-4">
                                                            {calculateDuration(session.scheduled_start, session.scheduled_stop)}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            {isSessionCompleted(session) ? (
                                                                <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                                                                    Completed
                                                                </span>
                                                            ) : (
                                                                <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs">
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex flex-col sm:flex-row gap-2">
                                                                {!isSessionCompleted(session) && (
                                                                    <button
                                                                        onClick={() => markComplete(session.id)}
                                                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                                                                    >
                                                                        Mark Complete
                                                                    </button>
                                                                )}
                                                                
                                                                {isSessionCompleted(session) && !hasReview(session) && (
                                                                    <button
                                                                        onClick={() => setReviewingSession(session.id)}
                                                                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm"
                                                                    >
                                                                        Write Review
                                                                    </button>
                                                                )}
                                                                
                                                                {hasReview(session) && (
                                                                    <span className="bg-gray-100 text-gray-800 py-1 px-3 rounded text-sm">
                                                                        Reviewed
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {reviewingSession === session.id && (
                                                        <tr>
                                                            <td colSpan="6" className="py-4 px-6 bg-gray-50">
                                                                <form onSubmit={(e) => submitReview(e, session.id)} className="space-y-4">
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            Rating (1-5)
                                                                        </label>
                                                                        <div className="flex gap-2">
                                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                                <button
                                                                                    key={star}
                                                                                    type="button"
                                                                                    onClick={() => setData("rating", star)}
                                                                                    className={`text-2xl ${
                                                                                        data.rating >= star
                                                                                            ? "text-yellow-400"
                                                                                            : "text-gray-300"
                                                                                    }`}
                                                                                >
                                                                                    ★
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                        {errors.rating && (
                                                                            <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
                                                                        )}
                                                                    </div>
                                                                    
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            Comment
                                                                        </label>
                                                                        <textarea
                                                                            value={data.comment}
                                                                            onChange={(e) => setData("comment", e.target.value)}
                                                                            className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                                            rows="3"
                                                                            placeholder="Share your experience with this tutor..."
                                                                        ></textarea>
                                                                        {errors.comment && (
                                                                            <p className="text-red-500 text-xs mt-1">{errors.comment}</p>
                                                                        )}
                                                                    </div>
                                                                    
                                                                    <div className="flex justify-end gap-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setReviewingSession(null)}
                                                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                        <button
                                                                            type="submit"
                                                                            disabled={processing}
                                                                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                                                        >
                                                                            {processing ? "Submitting..." : "Submit Review"}
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">You haven't booked any tuition sessions yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
