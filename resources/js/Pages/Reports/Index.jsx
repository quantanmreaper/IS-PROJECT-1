import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';

export default function ReportIndex({ reportTypes }) {
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post, errors } = useForm({
        reportType: reportTypes[0]?.value || 'summary',
        startDate: format(new Date(new Date().setDate(new Date().getDate() - 30)), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        format: 'preview'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (data.format === 'preview') {
            post(route('admin.reports.preview'), {
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            });
        } else {
            // For downloads, use a direct form submission to force download
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = route('admin.reports.download');
            
            // CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);
            
            // Add form data
            for (const [key, value] of Object.entries(data)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            }
            
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-blue-600 mb-2">Generate Reports</h1>
                                <p className="text-gray-600">
                                    Create detailed reports about users, courses, and sessions on the platform.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Report Type Selection */}
                                    <div>
                                        <label 
                                            htmlFor="reportType" 
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Report Type
                                        </label>
                                        <select
                                            id="reportType"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            value={data.reportType}
                                            onChange={(e) => setData('reportType', e.target.value)}
                                        >
                                            {reportTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date Range */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label 
                                                htmlFor="startDate" 
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Start Date
                                            </label>
                                            <input
                                                id="startDate"
                                                type="date"
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                value={data.startDate}
                                                onChange={(e) => setData('startDate', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label 
                                                htmlFor="endDate" 
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                End Date
                                            </label>
                                            <input
                                                id="endDate"
                                                type="date"
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                value={data.endDate}
                                                onChange={(e) => setData('endDate', e.target.value)}
                                                min={data.startDate}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Format Selection */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Report Format
                                    </label>
                                    <div className="flex space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="format"
                                                value="preview"
                                                checked={data.format === 'preview'}
                                                onChange={() => setData('format', 'preview')}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">Preview Online</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="format"
                                                value="pdf"
                                                checked={data.format === 'pdf'}
                                                onChange={() => setData('format', 'pdf')}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">Download PDF</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="format"
                                                value="excel"
                                                checked={data.format === 'excel'}
                                                onChange={() => setData('format', 'excel')}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">Download Excel</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Errors */}
                                {errors.reportType && <div className="text-red-500 text-sm mt-1">{errors.reportType}</div>}
                                {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate}</div>}
                                {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate}</div>}

                                {/* Submit Button */}
                                <div className="flex justify-end mt-6">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : data.format === 'preview' ? 'Preview Report' : `Download ${data.format.toUpperCase()}`}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 