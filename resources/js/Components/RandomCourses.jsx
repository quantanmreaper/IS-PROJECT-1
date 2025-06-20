import React from 'react';
import { Link } from '@inertiajs/react';

export default function RandomCourses({ courses }) {
    if (!courses || courses.length === 0) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-center font-medium">No courses available at the moment.</p>
            </div>
        );
    }

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
                <h2 className="text-xl font-bold text-gray-800">Featured Courses</h2>
                <Link 
                    href={route('courses.all')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all duration-200 font-medium flex items-center text-base"
                >
                    View all courses
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div 
                            key={course.id} 
                            className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
                        >
                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                {course.thumbnail ? (
                                    <img 
                                        src={course.thumbnail} 
                                        alt={course.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.style.display = 'none';
                                            e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                                            e.target.parentNode.innerHTML = '<span class="text-blue-600 font-semibold">Course Preview</span>';
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-blue-50">
                                        <span className="text-blue-600 font-semibold">Course Preview</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex flex-col flex-grow p-5">
                                <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                                    {course.title}
                                </h3>
                                
                                <p className="text-sm text-gray-500 mb-3 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                    </svg>
                                    {course.seller.name}
                                </p>
                                
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                                    {course.description}
                                </p>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold text-blue-600 text-lg">
                                        Ksh{course.price}
                                    </span>
                                   {/*  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {course.status}
                                    </span> */}
                                </div>
                                
                                <Link 
                                    href={`/courses/${course.id}`} 
                                    className="mt-auto w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    <span>View Course</span>
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
