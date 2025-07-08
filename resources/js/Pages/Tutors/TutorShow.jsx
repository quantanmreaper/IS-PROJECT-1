import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function TutorShow({ tutor }) {
    // Use average_rating and reviews_count from backend if available
    const averageRating = tutor.average_rating;
    const reviewsCount = tutor.reviews_count;

    const [showAllReviews, setShowAllReviews] = useState(false);
    // Shuffle reviews and pick 3 random ones for initial display
    const shuffledReviews = tutor.reviews
        ? [...tutor.reviews].sort(() => 0.5 - Math.random())
        : [];
    const reviewsToShow = showAllReviews
        ? shuffledReviews
        : shuffledReviews.slice(0, 3);

    return (
        <AuthenticatedLayout>
            <>
                <Head title={`Tutor: ${tutor.name}`} />
                <div className="py-10 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                        <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                            <div className="flex flex-col items-center gap-4 mb-8">
                                <img
                                    src={
                                        tutor.pfp
                                            ? `/storage/${tutor.pfp}`
                                            : "/defaultpfp.png"
                                    }
                                    alt={tutor.name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-lg mb-2"
                                />
                                <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow tracking-tight mb-1">
                                    {tutor.name}
                                </h1>
                                {tutor.bio && (
                                    <p className="text-gray-600 text-center max-w-xl mb-2">
                                        {tutor.bio}
                                    </p>
                                )}
                                <div className="flex flex-col items-center gap-2">
                                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                                        Hourly Rate: Ksh{" "}
                                        {tutor.hourly_rate ?? "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-blue-800 mb-3">
                                    Units Taught
                                </h2>
                                {tutor.units && tutor.units.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {tutor.units.map((unit, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                                            >
                                                {typeof unit === "string"
                                                    ? unit
                                                    : unit.name}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-gray-500">
                                        No units listed.
                                    </div>
                                )}
                            </div>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-blue-800 mb-3">
                                    Availability
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                                        Start:{" "}
                                        {tutor.availability_start ?? "N/A"}
                                    </span>
                                    <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold">
                                        Stop: {tutor.availability_stop ?? "N/A"}
                                    </span>
                                </div>
                            </div>
                            {/* Average Rating Display (before Book Session button) */}
                            <div className="flex justify-center items-center mb-6">
                                <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
                                    <div className="text-yellow-500 text-xl mr-2">
                                        ★
                                    </div>
                                    <div>
                                        <span className="font-bold text-lg">
                                            {averageRating
                                                ? averageRating
                                                : "No ratings yet"}
                                        </span>
                                        {averageRating && (
                                            <span className="text-gray-500 text-sm ml-1">
                                                ({reviewsCount}{" "}
                                                {reviewsCount === 1
                                                    ? "review"
                                                    : "reviews"}
                                                )
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Reviews List */}
                            {tutor.reviews && tutor.reviews.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 mb-4">
                                        Student Reviews
                                    </h2>
                                    <div className="space-y-4">
                                        {reviewsToShow.map((review, index) => (
                                            <div
                                                key={index}
                                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                                            >
                                                <div className="flex items-center mb-2">
                                                    <div className="text-yellow-400 flex">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="text-lg"
                                                                >
                                                                    {i <
                                                                    review.rating
                                                                        ? "★"
                                                                        : "☆"}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        {new Date(
                                                            review.created_at
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    {tutor.reviews.length > 3 && (
                                        <button
                                            className="mt-4 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition"
                                            onClick={() =>
                                                setShowAllReviews(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            {showAllReviews
                                                ? "Show Less"
                                                : `Show All (${tutor.reviews.length})`}
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="flex justify-center mt-8">
                                <a
                                    href={route("bookTutor.create", tutor.id)}
                                    className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all duration-200 text-lg"
                                >
                                    Book a Session
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
