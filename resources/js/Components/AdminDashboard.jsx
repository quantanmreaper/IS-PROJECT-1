import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard({ metrics }) {
    // If no metrics are provided, return null
    if (!metrics) return null;

    // State for chart data
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch chart data on component mount
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(route('admin.reports.chart-data'));
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, []);

    // Prepare chart configuration
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Growth Statistics',
                font: {
                    size: 16,
                    weight: 'bold',
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                },
                title: {
                    display: true,
                    text: 'Number of Records'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            }
        }
    };

    // Define the metrics cards with their icons and data
    const metricCards = [
        {
            title: 'Total Users',
            value: metrics.total_users || 0,
            icon: (
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            bgGradient: 'from-blue-50 to-blue-100',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700'
        },
        {
            title: 'Total Courses',
            value: metrics.total_courses || 0,
            icon: (
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            bgGradient: 'from-blue-50 to-blue-100',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700'
        },
        {
            title: 'Total Sessions',
            value: metrics.total_sessions || 0,
            icon: (
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bgGradient: 'from-blue-50 to-blue-100',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700'
        }
    ];

    return (
        <div className="mb-10">
            {/* Admin Dashboard Header */}
            <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-8 md:px-10 md:py-12 relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-blue-500 opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-blue-500 opacity-20"></div>
                    
                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <div className="flex items-center">
                                <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    Admin Dashboard
                                </h1>
                            </div>
                            <p className="text-blue-100 text-lg mt-2 max-w-2xl">
                                Monitor and manage platform's key metrics and performance.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <div className="text-white text-sm">
                                <span className="font-medium">Last Updated:</span> {new Date().toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics Section */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Key Platform Metrics</h2>
                    <Link 
                        href={route('admin.reports')}
                        className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        View Detailed Reports
                    </Link>
                </div>
                
                {/* Large metric cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metricCards.map((card, index) => (
                        <div 
                            key={index}
                            className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl shadow-md border ${card.borderColor} overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className="p-6 sm:p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-lg mb-1">
                                            {card.title}
                                        </h3>
                                        <div className={`text-4xl font-bold ${card.textColor}`}>
                                            {card.value.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-full bg-white shadow-sm">
                                        {card.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Section */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Platform Analytics</h2>
                
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">Monthly Growth Trends</h3>
                            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                                Monthly Registration Data
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-80">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : chartData ? (
                            <div style={{ height: "400px" }}>
                                <Bar
                                    options={barOptions}
                                    data={{
                                        labels: chartData.monthlyUsers.map(item => item.month),
                                        datasets: [
                                            {
                                                label: 'Users',
                                                data: chartData.monthlyUsers.map(item => item.count),
                                                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                                                borderColor: 'rgb(37, 99, 235)',
                                                borderWidth: 1
                                            },
                                            {
                                                label: 'Courses',
                                                data: chartData.monthlyCourses.map(item => item.count),
                                                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                                                borderColor: 'rgb(5, 150, 105)',
                                                borderWidth: 1
                                            },
                                            {
                                                label: 'Sessions',
                                                data: chartData.monthlySessions.map(item => item.count),
                                                backgroundColor: 'rgba(245, 158, 11, 0.7)',
                                                borderColor: 'rgb(217, 119, 6)',
                                                borderWidth: 1
                                            }
                                        ]
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-12">
                                No chart data available
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Platform Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Detailed Reports Section</h3>
                                <span className="bg-blue-600 text-white text-xs font-medium px-10 py-1 rounded-full">
                                    Admin Tools
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center items-center">
                                <div className="max-w-md w-full">
                                    <Link 
                                        href={route('admin.reports')}
                                        className="flex items-center justify-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors duration-200 group w-full"
                                    >
                                        <svg className="w-6 h-6 text-blue-600 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span className="font-medium text-gray-800">Download Detailed Report</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 