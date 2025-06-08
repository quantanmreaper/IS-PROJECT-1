import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Components/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Desktop sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>
            
            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Sidebar */}
                    <div className="fixed inset-y-0 left-0 w-64 z-50">
                        <Sidebar mobile={true} closeSidebar={() => setSidebarOpen(false)} />
                    </div>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                </div>
            )}
            
            <div className="flex-1 md:ml-64">
                {/* Top bar with search */}
                <div className="bg-white px-4 sm:px-6 md:px-8 py-4 md:py-6 shadow flex items-center justify-between">
                    {/* Hamburger menu for mobile */}
                    <button
                        type="button"
                        className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-xs sm:max-w-md md:max-w-lg px-3 sm:px-4 py-1 sm:py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="ml-3 sm:ml-4 md:ml-6 flex items-center">
                        <span className="text-gray-700 font-medium text-sm sm:text-base">{user.name}</span>
                    </div>
                </div>
                
                {/* Optional: header prop */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}