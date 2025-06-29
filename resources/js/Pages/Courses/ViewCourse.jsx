import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { router } from "@inertiajs/react";
import toastr from "toastr";
import YouTubeEmbed from '@/Components/YouTubeEmbed';

export default function ViewCourse({ auth, course, isEnrolled }) {
    // State for active curriculum section
    const [activeSection, setActiveSection] = useState(0);

    // State for review form
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // State for course reviews
    const [reviews, setReviews] = useState(course.reviews || []);

    // State for enrollment
    const [enrolling, setEnrolling] = useState(false);
    const [enrolled, setEnrolled] = useState(isEnrolled);

    // State for active lesson
    const [activeLesson, setActiveLesson] = useState(null);

    // Format date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate average rating
    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            : 0;

    // Calculate total lessons count
    const totalLessons = course.sections
        ? course.sections.reduce(
              (total, section) => total + section.lessons.length,
              0
          )
        : 0;

    // Submit review handler
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await axios.post(`/courses/${course.id}/reviews`, {
                rating,
                comment,
            });

            // Add new review to the list
            setReviews([...reviews, response.data.review]);

            // Reset form and close
            setRating(0);
            setComment("");
            setShowReviewForm(false);
        } catch (err) {
            setError(
                err.response?.data?.errors?.comment?.[0] ||
                    err.response?.data?.errors?.rating?.[0] ||
                    "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Enroll handler
    const handleEnroll = async () => {
        if (enrolled || enrolling) return;
        setEnrolling(true);
        try {
            const response = await axios.post(`/courses/${course.id}/purchase`);
            if (response.data.redirect) {
                toastr.info("Redirecting to payment...");
                window.location.href = response.data.redirect;
            } else if (response.data.success) {
                toastr.success(
                    response.data.message || "Enrolled successfully!"
                );
                setEnrolled(true);
            } else if (response.data.error) {
                toastr.error(response.data.error);
            }
        } catch (err) {
            toastr.error(
                err.response?.data?.error || "Failed to initiate payment."
            );
        } finally {
            setEnrolling(false);
        }
    };

    // Handle lesson click
    const handleLessonClick = (lesson) => {
        if (enrolled || lesson.is_free) {
            setActiveLesson(lesson);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={course.title} />

            <div className="py-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    {/* Course Overview Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
                        <div className="md:flex flex-col md:flex-row">
                            {/* Course Image */}
                            <div className="md:w-2/5 lg:w-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center h-56 sm:h-64 md:h-auto">
                                {course.thumbnail ? (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-center p-6 w-full h-full flex flex-col items-center justify-center">
                                        <svg
                                            className="mx-auto h-16 w-16 text-blue-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                            />
                                        </svg>
                                        <p className="mt-4 text-sm font-medium text-blue-600">
                                            Course Preview
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* Course Details */}
                            <div className="p-5 sm:p-8 md:w-3/5 lg:w-2/3 flex flex-col justify-between">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div className="mb-4 md:mb-0 md:pr-6">
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
                                            {course.title}
                                        </h1>
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    course.seller.name
                                                )}&background=random&color=fff`}
                                                alt={course.seller.name}
                                                className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-sm"
                                            />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">
                                                    Instructor
                                                </p>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {course.seller.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base md:text-lg font-bold px-5 py-2 rounded-lg shadow mb-2 transition-all duration-200">
                                            {course.price > 0
                                                ? `KSh ${course.price}`
                                                : "Free"}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Published on{" "}
                                            {formatDate(course.created_at)}
                                        </p>
                                    </div>
                                </div>
                                {reviews.length > 0 && (
                                    <div className="flex items-center mt-4 mb-4 bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${
                                                        i <
                                                        Math.round(
                                                            averageRating
                                                        )
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                                {averageRating.toFixed(1)} (
                                                {reviews.length} reviews)
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        About this course
                                    </h3>
                                    <div className="prose prose-blue max-w-none text-gray-700">
                                        <p>{course.description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {enrolled ? (
                                        <button
                                            className="flex-1 bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow-md cursor-default"
                                            disabled
                                        >
                                            Enrolled
                                        </button>
                                    ) : (
                                        <button
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md group disabled:opacity-60"
                                            onClick={handleEnroll}
                                            disabled={enrolling}
                                        >
                                            {enrolling ? (
                                                <>
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    Enroll Now
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Course Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">
                                    Duration
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Self-paced
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">
                                    Price
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {course.price > 0
                                        ? `KSh ${course.price}`
                                        : "Free"}
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">
                                    Lessons
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {totalLessons || "Multiple"} lessons
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">
                                    Language
                                </h4>
                                <p className="text-sm text-gray-500">English</p>
                            </div>
                        </div>
                    </div>
                    {/* Course Curriculum Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
                        <div className="p-5 sm:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Course Curriculum
                                </h2>
                                {totalLessons > 0 && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                        {totalLessons}{" "}
                                        {totalLessons === 1
                                            ? "lesson"
                                            : "lessons"}
                                    </span>
                                )}
                            </div>
                            {course.sections && course.sections.length > 0 ? (
                                <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                                    {course.sections.map((section, index) => (
                                        <div
                                            key={section.id}
                                            className="bg-white group"
                                        >
                                            <button
                                                className="w-full px-5 py-4 flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                                onClick={() =>
                                                    setActiveSection(
                                                        activeSection === index
                                                            ? -1
                                                            : index
                                                    )
                                                }
                                                aria-expanded={
                                                    activeSection === index
                                                }
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-semibold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-medium text-gray-900 text-base sm:text-lg">
                                                        {section.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-500 mr-3">
                                                        {section.lessons.length}{" "}
                                                        {section.lessons
                                                            .length === 1
                                                            ? "lesson"
                                                            : "lessons"}
                                                    </span>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                                                            activeSection ===
                                                            index
                                                                ? "transform rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                            {activeSection === index && (
                                                <div className="bg-gray-50 border-t border-gray-200">
                                                    {section.lessons.map((lesson, lessonIndex) => (
                                                        <div
                                                            key={lesson.id}
                                                            className={`px-5 py-3 border-b last:border-b-0 border-gray-200 flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 group ${(enrolled || lesson.is_free) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                                            onClick={() => handleLessonClick(lesson)}
                                                        >
                                                            <div className="flex items-center flex-1 min-w-0">
                                                                {/* If enrolled or lesson is free, show content */}
                                                                {(enrolled || lesson.is_free) ? (
                                                                    <>
                                                                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center mr-3">
                                                                            {lesson.content_type === 'video' && (
                                                                                <svg
                                                                                    className="w-5 h-5 text-blue-600"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth="2"
                                                                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                                    />
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth="2"
                                                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                    />
                                                                                </svg>
                                                                            )}
                                                                        </div>
                                                                        <div className="min-w-0 flex-1">
                                                                            <div className="flex items-center">
                                                                                <span className="text-sm font-medium text-gray-900 truncate mr-2 group-hover:text-blue-700 transition-colors duration-200">
                                                                                    {lesson.title}
                                                                                </span>
                                                                                {lesson.is_free && (
                                                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2">
                                                                                        Free
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            {lesson.content_type && (
                                                                                <p className="text-xs text-gray-500 mt-0.5">
                                                                                    {lesson.content_type
                                                                                        .charAt(0)
                                                                                        .toUpperCase() +
                                                                                        lesson.content_type.slice(1)}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    // For non-enrolled users, show locked content
                                                                    <>
                                                                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center mr-3">
                                                                            <svg
                                                                                className="w-5 h-5 text-gray-400"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth="2"
                                                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                        <div className="min-w-0 flex-1">
                                                                            <div className="flex items-center">
                                                                                <span className="text-sm font-medium text-gray-400 truncate mr-2">
                                                                                    {lesson.title}
                                                                                </span>
                                                                                {lesson.is_free && (
                                                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2">
                                                                                        Free
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <p className="text-xs text-gray-500 mt-0.5">
                                                                                Enroll to unlock this content
                                                                            </p>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            
                                                            {/* Lock icon for non-enrolled users */}
                                                            {!enrolled && !lesson.is_free && (
                                                                <div className="ml-4">
                                                                    <svg
                                                                        className="w-5 h-5 text-gray-400"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-blue-50">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        No curriculum available
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        This course doesn't have any lessons
                                        yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Enrollment prompt banner for non-enrolled users */}
                    {!enrolled && (
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Enroll to access full course content</h3>
                                    <p className="text-sm text-gray-600">This course requires enrollment to view all lessons and materials.</p>
                                </div>
                            </div>
                            <button
                                onClick={handleEnroll}
                                disabled={enrolling}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                            >
                                {enrolling ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>Enroll Now</>
                                )}
                            </button>
                        </div>
                    )}
                    {/* Lesson Content Display */}
                    {activeLesson && (enrolled || activeLesson.is_free) && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
                            <div className="p-5 sm:p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {activeLesson.title}
                                    </h2>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                        {activeLesson.content_type.charAt(0).toUpperCase() + activeLesson.content_type.slice(1)}
                                    </span>
                                </div>

                                {/* Video Content */}
                                {activeLesson.content_type === 'video' && activeLesson.video_path && (
                                    <div className="mb-6">
                                        <YouTubeEmbed url={activeLesson.video_path} />
                                    </div>
                                )}

                                {/* Text Content */}
                                {activeLesson.content && (
                                    <div className="prose prose-blue max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {/* Course Reviews Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                        <div className="p-5 sm:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Student Reviews
                                </h2>
                                {reviews.length > 0 && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                        {reviews.length}{" "}
                                        {reviews.length === 1
                                            ? "review"
                                            : "reviews"}
                                    </span>
                                )}
                            </div>

                            {/* Add Review Button */}
                            <div className="mb-8 text-center">
                                {!showReviewForm ? (
                                    <button
                                        onClick={() => setShowReviewForm(true)}
                                        className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 group"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                        Add a Review
                                    </button>
                                ) : null}
                            </div>

                            {/* Inline Review Form */}
                            {showReviewForm && (
                                <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Write Your Review
                                    </h3>
                                    <form onSubmit={handleSubmitReview}>
                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Rating
                                            </label>
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() =>
                                                            setRating(star)
                                                        }
                                                        onMouseEnter={() =>
                                                            setHoverRating(star)
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoverRating(0)
                                                        }
                                                        className="focus:outline-none mr-1"
                                                    >
                                                        <svg
                                                            className={`w-8 h-8 ${
                                                                (hoverRating ||
                                                                    rating) >=
                                                                star
                                                                    ? "text-yellow-400"
                                                                    : "text-gray-300"
                                                            } transition-colors duration-150 hover:scale-110`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                                <span className="ml-2 text-sm text-gray-500">
                                                    {rating > 0
                                                        ? `${rating}/5`
                                                        : "Select a rating"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label
                                                htmlFor="comment"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Your Review
                                            </label>
                                            <textarea
                                                id="comment"
                                                rows="4"
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                                placeholder="Share your experience with this course..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        {error && (
                                            <div className="mb-4 p-2 bg-red-50 text-sm text-red-600 rounded-md">
                                                {error}
                                            </div>
                                        )}
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowReviewForm(false);
                                                    setRating(0);
                                                    setComment("");
                                                    setError("");
                                                }}
                                                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={
                                                    isSubmitting ||
                                                    rating === 0 ||
                                                    comment.trim() === ""
                                                }
                                                className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
                                                    ${
                                                        isSubmitting ||
                                                        rating === 0 ||
                                                        comment.trim() === ""
                                                            ? "opacity-60 cursor-not-allowed"
                                                            : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    }`}
                                            >
                                                {isSubmitting
                                                    ? "Submitting..."
                                                    : "Submit Review"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {reviews.length > 0 ? (
                                <>
                                    {/* Rating Summary */}
                                    <div className="bg-gray-50 rounded-lg p-6 mb-8 flex flex-col md:flex-row md:items-center gap-6">
                                        <div className="text-center md:text-left md:flex-1">
                                            <div className="flex items-center justify-center md:justify-start mb-2">
                                                <span className="text-5xl font-bold text-gray-900 mr-2">
                                                    {averageRating.toFixed(1)}
                                                </span>
                                                <div className="flex flex-col items-start">
                                                    <div className="flex">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className={`w-5 h-5 ${
                                                                        i <
                                                                        Math.round(
                                                                            averageRating
                                                                        )
                                                                            ? "text-yellow-400"
                                                                            : "text-gray-300"
                                                                    }`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        out of 5
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Based on {reviews.length}{" "}
                                                {reviews.length === 1
                                                    ? "review"
                                                    : "reviews"}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Individual Reviews */}
                                    <div className="space-y-8">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0 group"
                                            >
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0 mr-4">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                                                            {review.user.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                                            <h4 className="font-medium text-gray-900 mb-1 sm:mb-0 group-hover:text-blue-700 transition-colors duration-200">
                                                                {
                                                                    review.user
                                                                        .name
                                                                }
                                                            </h4>
                                                            <span className="text-sm text-gray-500">
                                                                {formatDate(
                                                                    review.created_at
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center mb-3">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className={`w-4 h-4 ${
                                                                            i <
                                                                            review.rating
                                                                                ? "text-yellow-400"
                                                                                : "text-gray-300"
                                                                        }`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                )
                                                            )}
                                                            <span className="ml-2 text-xs text-gray-500">
                                                                {review.rating}
                                                                /5
                                                            </span>
                                                        </div>
                                                        <div className="prose prose-sm max-w-none text-gray-700">
                                                            <p>
                                                                {review.comment}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-blue-50">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        No reviews yet
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 mb-4">
                                        Be the first to review this course!
                                    </p>
                                    <button
                                        onClick={() => setShowReviewForm(true)}
                                        className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                        Write First Review
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
