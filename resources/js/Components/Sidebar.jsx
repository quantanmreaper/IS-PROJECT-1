import { Link } from "@inertiajs/react";

export default function Sidebar({ mobile, closeSidebar, user }) {
    const links = [
        {
            href: route("dashboard"),
            label: "Dashboard",
            icon: (
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
            ),
        },
        ...(!user?.is_mentor
            ? [
                  {
                      href: route("MentorRegistration"),
                      label: "Become a Mentor",
                      icon: (
                          <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                          >
                              <circle cx="12" cy="8" r="4" />
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                              />
                          </svg>
                      ),
                  },
              ]
            : []),
        ...(!user?.is_tutor
            ? [
                  {
                      href: route("TutorRegistration.create"),
                      label: "Become a Tutor",
                      icon: (
                          <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 14l9-5-9-5-9 5 9 5z"
                              />
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.477V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.523a12.083 12.083 0 012.84-2.899L12 14z"
                              />
                          </svg>
                      ),
                  },
              ]
            : []),
        {
            label: "Get Tutored",
            href: route("GetTutored.index"),
            icon: (
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 21l4-4 4 4m0 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16m16 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
                    />
                </svg>
            ),
        },

        {
            label: "Get Mentored",
            icon: (
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 21l4-4 4 4m0 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16m16 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
                    />
                </svg>
            ),
        },

        {
            href: route("UnitsAddition"),
            label: "Units Addition",
            icon: (
                <svg
                    className="w-5 h-5 text-white-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6v13a1 1 0 001 1h14a1 1 0 001-1V6"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 3v4a1 1 0 01-1 1H9a1 1 0 01-1-1V3"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 3h8"
                    />
                </svg>
            ),
        },
        {
            href: route("profile.edit"),
            label: "Profile",
            icon: (
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="8" r="4" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                </svg>
            ),
        },
        {
            href: route("logout"),
            label: "Logout",
            icon: (
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
            ),
            method: "post",
        },
    ];
    return (
        <aside className="h-full w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col shadow-lg z-20 md:fixed md:top-0 md:left-0">
            <div className="flex items-center justify-between p-4 md:p-6">
                <div className="text-xl md:text-2xl font-bold tracking-wide">
                    Peer Mentor & Tutoring
                </div>
                {mobile && (
                    <button
                        onClick={closeSidebar}
                        className="text-white hover:text-gray-200 md:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <nav className="flex-1 px-3 md:px-4 space-y-1 md:space-y-2 overflow-y-auto">
                {links.map((link) => (
                    <Link
                        key={link.href || link.label}
                        href={link.href}
                        method={link.method || "get"}
                        as={link.as || "a"}
                        className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
