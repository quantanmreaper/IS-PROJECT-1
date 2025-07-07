import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MyCourses({ auth, courses }) {
    // Function to get status badge style based on course status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Courses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
                                <Link
                                    href={route('CourseRegistration')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Create New Course
                                </Link>
                            </div>

                            {courses.length === 0 ? (
                                <div className="bg-yellow-50 p-4 rounded-md">
                                    <p className="text-yellow-700">
                                        You haven't created any courses yet. Click the "Create New Course" button to get started.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6">
                                    {courses.map((course) => (
                                        <div key={course.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row">
                                                {/* Course Thumbnail */}
                                                <div className="md:w-1/4 h-48 md:h-auto">
                                                    <img 
                                                        src={course.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'} 
                                                        alt={course.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                
                                                {/* Course Details */}
                                                <div className="p-6 md:w-3/4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                                                            <div className="flex items-center mb-4">
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(course.status)}`}>
                                                                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                                                </span>
                                                                <span className="mx-2 text-gray-400">•</span>
                                                                <span className="text-sm text-gray-500">
                                                                    KSh {course.price}
                                                                </span>
                                                                {course.stats.average_rating > 0 && (
                                                                    <>
                                                                        <span className="mx-2 text-gray-400">•</span>
                                                                        <div className="flex items-center">
                                                                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                            </svg>
                                                                            <span className="ml-1 text-sm text-gray-500">
                                                                                {typeof course.stats.average_rating === 'number' 
                                                                                    ? Number(course.stats.average_rating).toLocaleString(undefined, {
                                                                                        minimumFractionDigits: 1,
                                                                                        maximumFractionDigits: 2
                                                                                      }) 
                                                                                    : course.stats.average_rating}
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            {course.status === 'draft' && (
                                                                <Link
                                                                    href={route('courses.publish', course.id)}
                                                                    method="post"
                                                                    as="button"
                                                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                                                >
                                                                    Publish
                                                                </Link>
                                                            )}
                                                            <Link
                                                                href={route('lessons.create.with.course', course.id)}
                                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                                            >
                                                                Manage Content
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                                                    
                                                    {/* Course Stats */}
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t pt-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Students</p>
                                                            <p className="font-semibold">{course.stats.total_students}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Sections</p>
                                                            <p className="font-semibold">{course.stats.total_sections}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Lessons</p>
                                                            <p className="font-semibold">{course.stats.total_lessons}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Reviews</p>
                                                            <p className="font-semibold">{course.stats.total_reviews}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 