import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ReportTable from './Partials/ReportTable';
import SummaryReport from './Partials/SummaryReport';
import PrimaryButton from '@/Components/PrimaryButton';
import { format } from 'date-fns';

export default function ReportPreview({ reportType, reportData, startDate, endDate }) {
    const { data, setData, post } = useForm({
        reportType: reportType,
        startDate: startDate,
        endDate: endDate,
        format: 'pdf', // Default format for download
    });
    
    const downloadReport = () => {
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
    };
    
    // Format the dates for display
    const formattedStartDate = format(new Date(startDate), 'MMMM d, yyyy');
    const formattedEndDate = format(new Date(endDate), 'MMMM d, yyyy');
    
    return (
        <AuthenticatedLayout>
            <Head title={`${reportData.title || 'Report'} Preview`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-blue-600">{reportData.title || 'Report'} Preview</h1>
                                    <p className="text-gray-600 mt-1">
                                        Showing data from {formattedStartDate} to {formattedEndDate}
                                    </p>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="flex space-x-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="format"
                                                value="pdf"
                                                checked={data.format === 'pdf'}
                                                onChange={() => setData('format', 'pdf')}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">PDF</span>
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
                                            <span className="ml-2 text-gray-700">Excel</span>
                                        </label>
                                    </div>
                                    
                                    <PrimaryButton onClick={downloadReport}>
                                        Download {data.format.toUpperCase()}
                                    </PrimaryButton>
                                    
                                    <a 
                                        href={route('admin.reports')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Back to Reports
                                    </a>
                                </div>
                            </div>
                            
                            {reportType === 'summary' ? (
                                <SummaryReport data={reportData} />
                            ) : (
                                <ReportTable data={reportData} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 