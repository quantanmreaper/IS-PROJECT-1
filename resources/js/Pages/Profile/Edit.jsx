import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { usePage } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile Information', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )},
        { id: 'password', label: 'Security Settings', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        )},
        { id: 'danger', label: 'Delete Account', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        )},
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="py-6 bg-gray-50 min-h-screen">
                {/* Profile Header */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg overflow-hidden mb-6">
                        <div className="px-4 py-8 sm:px-6 lg:px-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
                            <div className="mb-4 sm:mb-0 sm:flex sm:items-center">
                                <div className="h-24 w-24 rounded-full bg-white/30 text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg mx-auto sm:mx-0">
                                    {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-6 text-white">
                                    <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
                                    <p className="mt-1 max-w-2xl text-sm opacity-90">
                                        Manage your account details, security settings, and more
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <span className="inline-flex overflow-hidden rounded-md shadow-sm">
                                    <button 
                                        type="button"
                                        className="inline-flex items-center rounded-l-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <svg className="mr-2 -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Contact Support
                                    </button>
                                    <button 
                                        type="button"
                                        className="inline-flex items-center rounded-r-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <svg className="mr-2 -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Help
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar / Tab Navigation */}
                        <div className="w-full lg:w-1/4">
                            <div className="bg-white overflow-hidden rounded-xl shadow-lg">
                                <nav className="flex flex-col">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center px-6 py-4 text-sm font-medium border-l-4 transition-all hover:bg-blue-50 ${
                                                activeTab === tab.id
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-transparent text-gray-700 hover:text-blue-700'
                                            }`}
                                        >
                                            <span className={`mr-3 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}`}>
                                                {tab.icon}
                                            </span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                                
                                
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="w-full lg:w-3/4">
                            <div className="bg-white overflow-hidden rounded-xl shadow-lg p-6 sm:p-8">
                                {activeTab === 'profile' && (
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="w-full"
                                    />
                                )}
                                
                                {activeTab === 'password' && (
                                    <UpdatePasswordForm className="w-full" />
                                )}
                                
                                {activeTab === 'danger' && (
                                    <DeleteUserForm className="w-full" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
