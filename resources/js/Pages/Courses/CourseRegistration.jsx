import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function CourseRegistration({ auth }) {
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        thumbnail: null,
        price: '',
        status: 'draft', // Default status
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('CourseRegistration'));
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setData('thumbnail', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Publish New Course" />

            <div className="py-6 sm:py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Banner */}
                    <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
                        <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="bg-white/20 p-3 rounded-full mr-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white">Create Your Course</h1>
                                    <p className="text-blue-100 mt-1">Share your knowledge with the world</p>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="p-6 sm:p-10">
                            {/* Progress Steps */}
                            <div className="mb-10">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center relative">
                                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-blue-600 border-blue-600 text-white flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-sm font-medium text-blue-600">Course Details</div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Basic Information
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="title" value="Course Title" className="text-gray-700 font-medium text-sm uppercase tracking-wide" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={data.title}
                                                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Enter an engaging course title"
                                                required
                                            />
                                            <p className="mt-1 text-xs text-gray-500">A catchy title will attract more students</p>
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="description" value="Course Description" className="text-gray-700 font-medium text-sm uppercase tracking-wide" />
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={data.description}
                                                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows={5}
                                                placeholder="Describe what students will learn in this course"
                                                required
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Be detailed about what students will gain from your course</p>
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Visual Presentation
                                    </h3>
                                    
                                    <div>
                                        <InputLabel htmlFor="thumbnail" value="Course Thumbnail" className="text-gray-700 font-medium text-sm uppercase tracking-wide" />
                                        
                                        <div className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg 
                                            ${thumbnailPreview ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300 transition-colors'}`}>
                                            <div className="space-y-1 text-center">
                                                {!thumbnailPreview ? (
                                                    <>
                                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
                                                            <label htmlFor="thumbnail" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                                                <span>Upload a thumbnail</span>
                                                                <input 
                                                                    id="thumbnail" 
                                                                    name="thumbnail" 
                                                                    type="file" 
                                                                    className="sr-only"
                                                                    onChange={handleThumbnailChange}
                                                                    accept="image/*"
                                                                />
                                                            </label>
                                                            <p className="pl-1 mt-1 sm:mt-0">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                                    </>
                                                ) : (
                                                    <div className="relative">
                                                        <img 
                                                            src={thumbnailPreview} 
                                                            alt="Thumbnail preview" 
                                                            className="mx-auto h-56 object-cover rounded-lg shadow-md" 
                                                        />
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                setThumbnailPreview(null);
                                                                setData('thumbnail', null);
                                                            }}
                                                            className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition-colors shadow-sm"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-4 inline-flex items-center px-3 py-2 border border-indigo-300 text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        >
                                                            <label htmlFor="thumbnail" className="cursor-pointer">
                                                                <span>Change image</span>
                                                                <input 
                                                                    id="thumbnail" 
                                                                    name="thumbnail" 
                                                                    type="file" 
                                                                    className="sr-only"
                                                                    onChange={handleThumbnailChange}
                                                                    accept="image/*"
                                                                />
                                                            </label>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">A compelling thumbnail increases course engagement by 80%</p>
                                        <InputError message={errors.thumbnail} className="mt-2" />
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        Pricing & Availability
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="price" value="Course Price (KSh)" className="text-gray-700 font-medium text-sm uppercase tracking-wide" />
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">KSh</span>
                                                </div>
                                                <TextInput
                                                    id="price"
                                                    type="number"
                                                    name="price"
                                                    value={data.price}
                                                    className="pl-12 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    min="0"
                                                    step="1"
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Set to 0 for a free course</p>
                                            <InputError message={errors.price} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="status" value="Course Status" className="text-gray-700 font-medium text-sm uppercase tracking-wide" />
                                            <select
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:border-green-500 focus:ring-green-500 sm:text-sm rounded-md"
                                                onChange={(e) => setData('status', e.target.value)}
                                                required
                                            >
                                                <option value="draft">Draft - Save now, publish later</option>
                                                <option value="published">Published - Make available to students</option>
                                                <option value="archived">Archived - Hide from course listings</option>
                                            </select>
                                            <p className="mt-1 text-xs text-gray-500">You can change this status later</p>
                                            <InputError message={errors.status} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                                        <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                                            You'll be able to add lessons after creating your course
                                        </p>
                                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
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
                                                className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
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
                                                        Create Course
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
