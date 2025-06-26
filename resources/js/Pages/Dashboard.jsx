import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import RandomCourses from "@/Components/RandomCourses";

export default function Dashboard() {
    const { user, randomCourses = [] } = usePage().props;

    // Quick actions for the dashboard
    const quickActions = [
        {
            title: "Find a Tutor",
            description: "Connect with expert tutors",
            icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            href: route("getTutored.index"),
            color: "bg-blue-50",
        },
        {
            title: "Find a Mentor",
            description: "Get guidance from mentors",
            icon: (
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            href: route("getMentored.index"),
            color: "bg-purple-50",
        },
        {
            title: "Browse Courses",
            description: "Explore learning materials",
            icon: (
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            href: route("courses.all"),
            color: "bg-green-50",
        },
        {
            title: "Messages",
            description: "Check your conversations",
            icon: (
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            href: route("chats.conversations"),
            color: "bg-yellow-50",
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Section with Greeting */}
                    <div className="mb-8 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg rounded-2xl">
                        <div className="px-6 py-8 md:px-10 md:py-12 relative">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-blue-400 opacity-20"></div>
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-blue-400 opacity-20"></div>
                            
                            <div className="relative">
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Welcome back, {user.name}!
                                </h1>
                                <p className="text-blue-100 text-lg max-w-2xl">
                                    Continue your learning journey or connect with tutors and mentors to enhance your skills.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Action Cards */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-5">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {quickActions.map((action, index) => (
                                <Link 
                                    key={index} 
                                    href={action.href}
                                    className={`${action.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] border border-gray-100 group`}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="mb-4">{action.icon}</div>
                                        <h3 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-blue-600">
                                            {action.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{action.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Featured Courses Section */}
                    <div className="mb-10">
                        <RandomCourses courses={randomCourses} />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}