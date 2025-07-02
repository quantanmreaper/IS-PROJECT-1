import React from 'react';

export default function TutorMetrics({ metrics }) {
    // If no metrics are provided, return null
    if (!metrics) return null;

    // Format currency for earnings
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Define the metrics cards with their icons and data
    const metricCards = [
        {
            title: 'Sessions Hosted',
            value: metrics.total_sessions_hosted || 0,
            icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bgColor: 'bg-blue-50',
            accentColor: 'bg-blue-100',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-600'
        },
        {
            title: 'Total Earnings',
            value: formatCurrency(metrics.total_earnings || 0),
            icon: (
                <div className="flex items-center justify-center w-8 h-8 text-blue-600">
                    <span className="font-bold text-lg">KSh</span>
                </div>
            ),
            bgColor: 'bg-blue-50',
            accentColor: 'bg-blue-100',
            borderColor: 'border-blue-200',
            textColor: 'text-green-600'
        },
        {
            title: 'Courses Created',
            value: metrics.total_courses_created || 0,
            icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            bgColor: 'bg-blue-50',
            accentColor: 'bg-blue-100',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-600'
        }
    ];

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Your Tutoring Stats</h2>
                <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Tutor Analytics
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metricCards.map((card, index) => (
                    <div 
                        key={index}
                        className={`${card.bgColor} rounded-xl shadow-sm border ${card.borderColor} overflow-hidden group hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]`}
                    >
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className={`${card.accentColor} p-3 rounded-full mr-3`}>
                                    {card.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 text-lg">
                                    {card.title}
                                </h3>
                            </div>
                            
                            <div className="flex items-baseline">
                                <span className={`text-3xl font-bold ${card.textColor}`}>
                                    {card.value}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
