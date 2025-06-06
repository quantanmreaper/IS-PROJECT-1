import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Components/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 ml-64">
                {/* Top bar with search */}
                <div className="bg-white px-8 py-6 shadow flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-lg px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="ml-6 flex items-center">
                        {/*   <img
                            src={user.pfp ? `/storage/${user.pfp}` : '/images/default-profile.png'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 mr-3"
                          /> */}
                        <span className="text-gray-700 font-medium mr-4">{user.name}</span>
                        {/* Add dropdown/profile menu here if needed */}
                    </div>
                </div>
                {/* Optional: header prop */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}