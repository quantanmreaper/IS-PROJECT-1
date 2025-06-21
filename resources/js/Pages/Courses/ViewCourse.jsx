import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ViewCourse({ auth, course }) {


    

    // State for active curriculum section
    const [activeSection, setActiveSection] = useState(0);
    
    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate average rating
    const averageRating = course.reviews && course.reviews.length > 0
        ? course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length
        : 0;
    
    // Calculate total lessons count
    const totalLessons = course.sections
        ? course.sections.reduce((total, section) => total + section.lessons.length, 0)
        : 0;

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
                                        <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        <p className="mt-4 text-sm font-medium text-blue-600">Course Preview</p>
                                    </div>
                                )}
                            </div>
                            {/* Course Details */}
                            <div className="p-5 sm:p-8 md:w-3/5 lg:w-2/3 flex flex-col justify-between">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div className="mb-4 md:mb-0 md:pr-6">
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">{course.title}</h1>
                                        <div className="flex items-center mb-4">
                                            <img 
                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.seller.name)}&background=random&color=fff`} 
                                                alt={course.seller.name}
                                                className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-sm"
                                            />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">Instructor</p>
                                                <span className="text-sm font-semibold text-gray-900">{course.seller.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base md:text-lg font-bold px-5 py-2 rounded-lg shadow mb-2 transition-all duration-200">
                                            {course.price > 0 ? `KSh ${course.price}` : 'Free'}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Published on {formatDate(course.created_at)}
                                        </p>
                                    </div>
                                </div>
                                {course.reviews && course.reviews.length > 0 && (
                                    <div className="flex items-center mt-4 mb-4 bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg 
                                                    key={i} 
                                                    className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                                {averageRating.toFixed(1)} ({course.reviews.length} reviews)
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About this course</h3>
                                    <div className="prose prose-blue max-w-none text-gray-700">
                                        <p>{course.description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md group">
                                        <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Course Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">Duration</h4>
                                <p className="text-sm text-gray-500">Self-paced</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">Price</h4>
                                <p className="text-sm text-gray-500">{course.price > 0 ? `KSh ${course.price}` : 'Free'}</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">Lessons</h4>
                                <p className="text-sm text-gray-500">{totalLessons || 'Multiple'} lessons</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full mb-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900">Language</h4>
                                <p className="text-sm text-gray-500">English</p>
                            </div>
                        </div>
                    </div>
                    {/* Course Curriculum Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
                        <div className="p-5 sm:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Course Curriculum</h2>
                                {totalLessons > 0 && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                        {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}
                                    </span>
                                )}
                            </div>
                            {course.sections && course.sections.length > 0 ? (
                                <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                                    {course.sections.map((section, index) => (
                                        <div key={section.id} className="bg-white group">
                                            <button 
                                                className="w-full px-5 py-4 flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                                onClick={() => setActiveSection(activeSection === index ? -1 : index)}
                                                aria-expanded={activeSection === index}
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-semibold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-medium text-gray-900 text-base sm:text-lg">{section.title}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-500 mr-3">
                                                        {section.lessons.length} {section.lessons.length === 1 ? 'lesson' : 'lessons'}
                                                    </span>
                                                    <svg 
                                                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${activeSection === index ? 'transform rotate-180' : ''}`} 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>
                                            {activeSection === index && (
                                                <div className="bg-gray-50 border-t border-gray-200">
                                                    {section.lessons.map((lesson, lessonIndex) => (
                                                        <div 
                                                            key={lesson.id} 
                                                            className="px-5 py-3 border-b last:border-b-0 border-gray-200 flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 group"
                                                        >
                                                            <div className="flex items-center flex-1 min-w-0">
                                                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center mr-3">
                                                                    {lesson.video_path ? (
                                                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center">
                                                                        <span className="text-sm font-medium text-gray-900 truncate mr-2 group-hover:text-blue-700 transition-colors duration-200">{lesson.title}</span>
                                                                        {lesson.is_free && (
                                                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2">
                                                                                Free
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {lesson.content_type && (
                                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                                            {lesson.content_type.charAt(0).toUpperCase() + lesson.content_type.slice(1)}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {/* Lock icon for non-enrolled users */}
                                                            {!lesson.is_free && (
                                                                <div className="ml-4">
                                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No curriculum available</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        This course doesn't have any lessons yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Course Reviews Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                        <div className="p-5 sm:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Student Reviews</h2>
                                {course.reviews && course.reviews.length > 0 && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                        {course.reviews.length} {course.reviews.length === 1 ? 'review' : 'reviews'}
                                    </span>
                                )}
                            </div>
                            {course.reviews && course.reviews.length > 0 ? (
                                <>
                                    {/* Rating Summary */}
                                    <div className="bg-gray-50 rounded-lg p-6 mb-8 flex flex-col md:flex-row md:items-center gap-6">
                                        <div className="text-center md:text-left md:flex-1">
                                            <div className="flex items-center justify-center md:justify-start mb-2">
                                                <span className="text-5xl font-bold text-gray-900 mr-2">{averageRating.toFixed(1)}</span>
                                                <div className="flex flex-col items-start">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg 
                                                                key={i} 
                                                                className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                                                fill="currentColor" 
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">out of 5</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Based on {course.reviews.length} {course.reviews.length === 1 ? 'review' : 'reviews'}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Individual Reviews */}
                                    <div className="space-y-8">
                                        {course.reviews.map((review) => (
                                            <div key={review.id} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0 group">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0 mr-4">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                                                            {review.user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                                            <h4 className="font-medium text-gray-900 mb-1 sm:mb-0 group-hover:text-blue-700 transition-colors duration-200">{review.user.name}</h4>
                                                            <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                                                        </div>
                                                        <div className="flex items-center mb-3">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg 
                                                                    key={i} 
                                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                                                    fill="currentColor" 
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                            <span className="ml-2 text-xs text-gray-500">
                                                                {review.rating}/5
                                                            </span>
                                                        </div>
                                                        <div className="prose prose-sm max-w-none text-gray-700">
                                                            <p>{review.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Add Review Button */}
                                    <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                                        <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 group">
                                            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Write a Review
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-blue-50">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    {/* <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Be the first to review this course!
                                    </p> */}
                                    <div className="mt-6">
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 group">
                                            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Add  Review
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
