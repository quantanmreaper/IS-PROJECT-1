import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AllCourses({ auth, courses }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [isLoading, setIsLoading] = useState(false);

    // Filter courses based on search term and filters
    useEffect(() => {
        setIsLoading(true);
        
        // Apply filters
        let result = [...courses];
        
        // Search filter
        if (searchTerm) {
            result = result.filter(course => 
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Price filter
        if (priceFilter === 'free') {
            result = result.filter(course => course.price === 0 || course.price === '0');
        } else if (priceFilter === 'paid') {
            result = result.filter(course => course.price > 0);
        } else if (priceFilter === 'under1000') {
            result = result.filter(course => course.price < 1000);
        } else if (priceFilter === 'over1000') {
            result = result.filter(course => course.price >= 1000);
        }
        
        // Sort
        if (sortBy === 'newest') {
            result = result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sortBy === 'oldest') {
            result = result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (sortBy === 'priceLow') {
            result = result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHigh') {
            result = result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'nameAZ') {
            result = result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'nameZA') {
            result = result.sort((a, b) => b.title.localeCompare(a.title));
        }
        
        setFilteredCourses(result);
        setTimeout(() => setIsLoading(false), 300); // Simulate loading for better UX
    }, [searchTerm, priceFilter, sortBy, courses]);

    return (
        <AuthenticatedLayout user={auth.user} hideSearch={true}>
            <Head title="All Courses" />

            <div className="py-6 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden mb-6 sm:mb-8 relative">
                        <div className="px-4 sm:px-8 py-8 sm:py-12 max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                                Explore All Courses
                            </h1>
                            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-blue-100">
                                Discover a wide range of courses taught by expert instructors to help you learn new skills and advance your career.
                            </p>
                            <div className="mt-6 sm:mt-8 bg-white rounded-lg p-2 flex flex-col sm:flex-row items-center shadow-lg">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="w-full sm:flex-1 border-0 focus:ring-0 px-4 py-3 text-gray-700 placeholder-gray-400 rounded-lg mb-2 sm:mb-0"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-200 sm:ml-2 flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 lg:block hidden">
                            <div className="h-full bg-opacity-50 flex items-center justify-center">
                                <svg className="w-64 h-64 text-white opacity-10" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-8 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-4 w-full sm:w-auto">
                                <div className="w-full xs:w-auto">
                                    <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <select
                                        id="priceFilter"
                                        className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                        value={priceFilter}
                                        onChange={(e) => setPriceFilter(e.target.value)}
                                    >
                                        <option value="all">All Prices</option>
                                        <option value="free">Free</option>
                                        <option value="paid">Paid</option>
                                        <option value="under1000">Under KSh 1000</option>
                                        <option value="over1000">KSh 1000 & Above</option>
                                    </select>
                                </div>
                                <div className="w-full xs:w-auto">
                                    <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                    <select
                                        id="sortBy"
                                        className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="oldest">Oldest</option>
                                        <option value="priceLow">Price: Low to High</option>
                                        <option value="priceHigh">Price: High to Low</option>
                                        <option value="nameAZ">Name: A to Z</option>
                                        <option value="nameZA">Name: Z to A</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                                Showing <span className="font-medium text-gray-900">{filteredCourses.length}</span> courses
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-8 sm:py-12">
                            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredCourses.map((course) => (
                                <div 
                                    key={course.id} 
                                    className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
                                >
                                    <div className="h-40 sm:h-48 bg-gray-100 relative overflow-hidden">
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
                                        {course.status === 'featured' && (
                                            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-col flex-grow p-4 sm:p-5">
                                        <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 sm:mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                                            {course.title}
                                        </h3>
                                        
                                        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 flex items-center">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                            </svg>
                                            {course.seller.name}
                                        </p>
                                        
                                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 flex-grow">
                                            {course.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                                            <span className="font-bold text-blue-600 text-base sm:text-lg">
                                                {course.price > 0 ? `KSh ${course.price}` : 'Free'}
                                            </span>
                                            {course.created_at && (
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hidden sm:inline-block">
                                                    {new Date(course.created_at).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <Link 
                                            href={route('courses.show', course.id)} 
                                            className="mt-auto w-full inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                        >
                                            <span>View Course</span>
                                            <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center">
                            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                                We couldn't find any courses matching your search criteria.
                                <br />Try adjusting your filters or search term.
                            </p>
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setPriceFilter('all');
                                    setSortBy('newest');
                                }}
                                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-sm sm:text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}