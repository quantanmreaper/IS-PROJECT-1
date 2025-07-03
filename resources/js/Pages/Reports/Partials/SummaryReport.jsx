import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SummaryReport({ data }) {
    // Color sets for charts
    const pieColors = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];
    const barColors = {
        backgroundColor: ['rgba(59, 130, 246, 0.7)'],
        borderColor: ['rgb(37, 99, 235)'],
    };

    // Prepare data for charts
    const userTypeData = {
        labels: Object.keys(data.user_types || {}),
        datasets: [
            {
                data: Object.values(data.user_types || {}),
                backgroundColor: pieColors,
                borderWidth: 1,
            },
        ],
    };

    const courseStatusData = {
        labels: Object.keys(data.course_statuses || {}),
        datasets: [
            {
                data: Object.values(data.course_statuses || {}),
                backgroundColor: pieColors,
                borderWidth: 1,
            },
        ],
    };

    const sessionStatusData = {
        labels: Object.keys(data.session_statuses || {}),
        datasets: [
            {
                data: Object.values(data.session_statuses || {}),
                backgroundColor: pieColors,
                borderWidth: 1,
            },
        ],
    };

    // Bar chart for period metrics
    const periodMetricsData = {
        labels: ['Users', 'Courses', 'Sessions'],
        datasets: [
            {
                label: 'New in Period',
                data: [data.new_users || 0, data.new_courses || 0, data.new_sessions || 0],
                backgroundColor: barColors.backgroundColor,
                borderColor: barColors.borderColor,
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'New Items in Selected Period',
            },
        },
    };

    return (
        <div>
            {/* Report Header */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Platform Summary Report</h2>
                <p className="text-gray-700">
                    <span className="font-semibold">Date Range:</span> {data.date_range}
                </p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg shadow border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center mb-2">
                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
                    </div>
                    <div className="mt-2">
                        <span className="text-3xl font-bold text-blue-600">{data.total_users}</span>
                        <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium text-blue-700">{data.new_users} new</span> in selected period
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center mb-2">
                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800">Total Courses</h3>
                    </div>
                    <div className="mt-2">
                        <span className="text-3xl font-bold text-blue-600">{data.total_courses}</span>
                        <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium text-blue-700">{data.new_courses} new</span> in selected period
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center mb-2">
                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800">Total Sessions</h3>
                    </div>
                    <div className="mt-2">
                        <span className="text-3xl font-bold text-blue-600">{data.total_sessions}</span>
                        <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium text-blue-700">{data.new_sessions} new</span> in selected period
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Period Metrics Chart */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">New Items in Selected Period</h3>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200" style={{ height: '300px' }}>
                    <Bar data={periodMetricsData} options={barOptions} />
                </div>
            </div>
            
            {/* Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {Object.keys(data.user_types || {}).length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">User Type Distribution</h3>
                        <div style={{ height: '280px' }}>
                            <Pie data={userTypeData} options={pieOptions} />
                        </div>
                    </div>
                )}
                
                {Object.keys(data.course_statuses || {}).length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Course Status Distribution</h3>
                        <div style={{ height: '280px' }}>
                            <Pie data={courseStatusData} options={pieOptions} />
                        </div>
                    </div>
                )}
                
                {Object.keys(data.session_statuses || {}).length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Session Status Distribution</h3>
                        <div style={{ height: '280px' }}>
                            <Pie data={sessionStatusData} options={pieOptions} />
                        </div>
                    </div>
                )}
            </div>
            
            {/* Data Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.keys(data.user_types || {}).length > 0 && (
                    <div>
                        <h4 className="text-md font-semibold text-blue-800 mb-2">User Types</h4>
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(data.user_types).map(([type, count], index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {Object.keys(data.course_statuses || {}).length > 0 && (
                    <div>
                        <h4 className="text-md font-semibold text-blue-800 mb-2">Course Statuses</h4>
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(data.course_statuses).map(([status, count], index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {Object.keys(data.session_statuses || {}).length > 0 && (
                    <div>
                        <h4 className="text-md font-semibold text-blue-800 mb-2">Session Statuses</h4>
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(data.session_statuses).map(([status, count], index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
} 