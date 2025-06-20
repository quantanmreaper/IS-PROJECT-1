import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Lessons({ auth, course, sections, userCourses }) {
    const { errors, flash } = usePage().props;
    const [videoPreview, setVideoPreview] = useState(null);
    const [selectedSection, setSelectedSection] = useState(sections && sections.length > 0 ? sections[0]?.id : '');
    const [showSectionForm, setShowSectionForm] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    
    const { data, setData, post, processing, reset } = useForm({
        course_section_id: selectedSection,
        title: '',
        content_type: 'text', // Default content type
        content: '',
        order: '',
        video_path: null,
    });
    
    const sectionForm = useForm({
        course_id: course?.id || '',
        title: '',
        order: '',
    });

    // Update selected section when sections prop changes
    useEffect(() => {
        if (sections && sections.length > 0) {
            setSelectedSection(sections[0].id);
            setData('course_section_id', sections[0].id);
        }
    }, [sections]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('lessons.store'));
    };
    
    const handleSectionSubmit = (e) => {
        e.preventDefault();
        sectionForm.post(route('course-sections.store'), {
            onSuccess: () => {
                sectionForm.reset();
                setShowSectionForm(false);
            },
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setData('video_path', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setVideoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
        setData('course_section_id', e.target.value);
    };

    const handleCourseChange = (e) => {
        sectionForm.setData('course_id', e.target.value);
    };

    const handleCourseSelection = (e) => {
        setSelectedCourseId(e.target.value);
    };

    // Course Selection UI when no course is selected
    const CourseSelectionUI = () => (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
            <div className="p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
                    <div className="bg-blue-600 p-3 rounded-full mb-4 sm:mb-0 sm:mr-4 self-start sm:self-auto">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Select a Course</h2>
                </div>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-700">Choose a Course to Manage</h3>
                    <p className="text-sm text-blue-600 mt-1">Select one of your courses to add sections and lessons.</p>
                </div>

                {userCourses && userCourses.length > 0 ? (
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center mb-2">
                                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <InputLabel htmlFor="course_selection" value="Your Courses" className="text-gray-700 font-medium" />
                            </div>
                            <select
                                id="course_selection"
                                name="course_selection"
                                value={selectedCourseId}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-md"
                                onChange={handleCourseSelection}
                                required
                            >
                                <option value="" disabled>Select a course</option>
                                {userCourses.map((userCourse) => (
                                    <option key={userCourse.id} value={userCourse.id}>
                                        {userCourse.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end">
                                                            <Link
                                    href={selectedCourseId ? route('lessons.create.with.course', selectedCourseId) : '#'}
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${selectedCourseId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                    disabled={!selectedCourseId}
                                >
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                Continue to Course Management
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 text-center">
                        <p>You don't have any courses yet. Please create a course first.</p>
                        <Link
                            href={route('CourseRegistration')}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Create a Course
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={course ? "Add Course Lesson" : "Select Course"} />

            <div className="py-6 sm:py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">
                            {flash.success}
                        </div>
                    )}
                    
                    {!course ? (
                        <CourseSelectionUI />
                    ) : (
                        <>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                                <div className="p-4 sm:p-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
                                        <div className="bg-blue-600 p-3 rounded-full mb-4 sm:mb-0 sm:mr-4 self-start sm:self-auto">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Course Management</h2>
                                    </div>

                                    {course && (
                                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-700">Course: {course.title}</h3>
                                            <p className="text-sm text-blue-600 mt-1">Organize your course by adding sections and lessons.</p>
                                        </div>
                                    )}
                                    
                                    {/* Course Sections Management */}
                                    <div className="mb-8">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Course Sections</h3>
                                            <button
                                                type="button"
                                                onClick={() => setShowSectionForm(!showSectionForm)}
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                {showSectionForm ? 'Cancel' : 'Add Section'}
                                            </button>
                                        </div>
                                        
                                        {sections && sections.length > 0 ? (
                                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                                <h4 className="font-medium text-gray-700 mb-2">Current Sections:</h4>
                                                <ul className="divide-y divide-gray-200">
                                                    {sections.map((section) => (
                                                        <li key={section.id} className="py-3 flex justify-between items-center">
                                                            <div>
                                                                <span className="font-medium">{section.title}</span>
                                                                <span className="ml-2 text-sm text-gray-500">Order: {section.order}</span>
                                                            </div>
                                                            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                                                                {section.lessons?.length || 0} lessons
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="bg-yellow-50 p-4 rounded-lg mb-4 text-yellow-700">
                                                No sections available. Please add a section before adding lessons.
                                            </div>
                                        )}
                                        
                                        {showSectionForm && (
                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                                                <h4 className="font-medium text-gray-700 mb-4">Add New Section</h4>
                                                <form onSubmit={handleSectionSubmit} className="space-y-4">
                                                    <div>
                                                        <div className="flex items-center mb-2">
                                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                            </svg>
                                                            <InputLabel htmlFor="course_id" value="Select Course" className="text-gray-700 font-medium" />
                                                        </div>
                                                        <select
                                                            id="course_id"
                                                            name="course_id"
                                                            value={sectionForm.data.course_id}
                                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-md"
                                                            onChange={handleCourseChange}
                                                            required
                                                        >
                                                            {userCourses && userCourses.map((userCourse) => (
                                                                <option key={userCourse.id} value={userCourse.id}>
                                                                    {userCourse.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <InputError message={sectionForm.errors.course_id} className="mt-2" />
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="flex items-center mb-2">
                                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <InputLabel htmlFor="section_title" value="Section Title" className="text-gray-700 font-medium" />
                                                        </div>
                                                        <TextInput
                                                            id="section_title"
                                                            type="text"
                                                            name="title"
                                                            value={sectionForm.data.title}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => sectionForm.setData('title', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={sectionForm.errors.title} className="mt-2" />
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="flex items-center mb-2">
                                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                            </svg>
                                                            <InputLabel htmlFor="section_order" value="Display Order" className="text-gray-700 font-medium" />
                                                        </div>
                                                        <TextInput
                                                            id="section_order"
                                                            type="number"
                                                            name="order"
                                                            value={sectionForm.data.order}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => sectionForm.setData('order', e.target.value)}
                                                            min="1"
                                                            required
                                                        />
                                                        <InputError message={sectionForm.errors.order} className="mt-2" />
                                                    </div>
                                                    
                                                    <div className="flex justify-end">
                                                        <button
                                                            type="submit"
                                                            disabled={sectionForm.processing}
                                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                                        >
                                                            {sectionForm.processing ? (
                                                                <>
                                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg>
                                                                    Processing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    Save Section
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {course && (
                    /* Lesson Form */
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
                                <div className="bg-blue-600 p-3 rounded-full mb-4 sm:mb-0 sm:mr-4 self-start sm:self-auto">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Add New Lesson</h2>
                            </div>
                            
                            {sections && sections.length > 0 ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Course Section Selection */}
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                            </svg>
                                            <InputLabel htmlFor="course_section_id" value="Course Section" className="text-gray-700 font-medium" />
                                        </div>
                                        <select
                                            id="course_section_id"
                                            name="course_section_id"
                                            value={data.course_section_id}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-md"
                                            onChange={handleSectionChange}
                                            required
                                        >
                                            {sections && sections.map((section) => (
                                                <option key={section.id} value={section.id}>
                                                    {section.title}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.course_section_id} className="mt-2" />
                                    </div>

                                    {/* Lesson Title */}
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <InputLabel htmlFor="title" value="Lesson Title" className="text-gray-700 font-medium" />
                                        </div>
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter a descriptive lesson title"
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    {/* Lesson Order */}
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                            </svg>
                                            <InputLabel htmlFor="order" value="Lesson Order" className="text-gray-700 font-medium" />
                                        </div>
                                        <TextInput
                                            id="order"
                                            type="number"
                                            name="order"
                                            value={data.order}
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            onChange={(e) => setData('order', e.target.value)}
                                            placeholder="Enter lesson order (e.g., 1, 2, 3)"
                                            min="1"
                                            required
                                        />
                                        <p className="mt-1 text-sm text-gray-500">This determines the order in which lessons appear.</p>
                                        <InputError message={errors.order} className="mt-2" />
                                    </div>

                                    {/* Content Type */}
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <InputLabel htmlFor="content_type" value="Content Type" className="text-gray-700 font-medium" />
                                        </div>
                                        <select
                                            id="content_type"
                                            name="content_type"
                                            value={data.content_type}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-md"
                                            onChange={(e) => setData('content_type', e.target.value)}
                                            required
                                        >
                                            <option value="text">Text Content</option>
                                            <option value="video">Video Content</option>
                                            
                                        </select>
                                        <InputError message={errors.content_type} className="mt-2" />
                                    </div>

                                    {/* Lesson Content */}
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M4 6h16M4 12h16M4 18h7" />
                                            </svg>
                                            <InputLabel htmlFor="content" value="Lesson Content" className="text-gray-700 font-medium" />
                                        </div>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={data.content}
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                            onChange={(e) => setData('content', e.target.value)}
                                            rows={8}
                                            placeholder="Enter the lesson content, notes, or instructions"
                                            required
                                        />
                                        <InputError message={errors.content} className="mt-2" />
                                    </div>

                                    {/* Video Upload */}
                                    {data.content_type === 'video' && (
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                <InputLabel htmlFor="video_path" value="Video Lecture" className="text-gray-700 font-medium" />
                                            </div>
                                            
                                            <div className={`mt-1 flex justify-center px-4 sm:px-6 pt-5 pb-6 border-2 border-dashed rounded-md 
                                                ${videoPreview ? 'border-blue-300 bg-blue-50' : 'border-gray-300'}`}>
                                                <div className="space-y-1 text-center">
                                                    {!videoPreview ? (
                                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    ) : (
                                                        <div className="relative">
                                                            <video 
                                                                src={videoPreview} 
                                                                className="mx-auto h-48 rounded-md shadow-md" 
                                                                controls
                                                            />
                                                            <button 
                                                                type="button"
                                                                onClick={() => {
                                                                    setVideoPreview(null);
                                                                    setData('video_path', null);
                                                                }}
                                                                className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )}
                                                    
                                                    <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
                                                        <label htmlFor="video_path" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                            <span>{videoPreview ? 'Change video' : 'Upload a video'}</span>
                                                            <input 
                                                                id="video_path" 
                                                                name="video_path" 
                                                                type="file" 
                                                                className="sr-only"
                                                                onChange={handleVideoChange}
                                                                accept="video/*"
                                                            />
                                                        </label>
                                                        <p className="pl-1 mt-1 sm:mt-0">{!videoPreview && 'or drag and drop'}</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">MP4, WebM, or OGG up to 100MB</p>
                                                </div>
                                            </div>
                                            <InputError message={errors.video_path} className="mt-2" />
                                        </div>
                                    )}

                                    <div className="pt-5 border-t border-gray-200">
                                        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => reset()}
                                                className="w-full sm:w-auto bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                            >
                                                {processing ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Add Lesson
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 text-center">
                                    <p>Please add a course section before adding lessons.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
