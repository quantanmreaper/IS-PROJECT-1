import { Link } from '@inertiajs/react';

const links = [
    {
        href: route('dashboard'),
        label: 'Dashboard',
        icon: (
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
    },
    {
        //href: route('Mentor'),
        label: 'Become a Mentor',
    },
    {

        label: 'Become a Tutor',
    },
    {
        label: 'Achievements',
    },
    {
        href: route('UnitsAddition'),
        label: 'Units Addition',
        icon: (
           <svg className="w-5 h-5 text-white-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6v13a1 1 0 001 1h14a1 1 0 001-1V6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4a1 1 0 01-1 1H9a1 1 0 01-1-1V3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8" />
            </svg>
        ),
    },
    {
        href: route('profile.edit'),
        label: 'Profile',
        icon: (
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
        ),
    },
    // Add more links as needed
];

export default function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white fixed top-0 left-0 flex flex-col shadow-lg z-20">
            <div className="p-6 text-2xl font-bold tracking-wide">
                Peer Mentor & Tutoring
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}