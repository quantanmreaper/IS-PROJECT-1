import { Link } from "@inertiajs/react";

export default function Sidebar({ mobile, closeSidebar, user }) {
    let links = [];

    // Admin links
    if (user?.user_type === "admin") {
        links = [
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
            {
                href: route("units.index"),
                label: "Units",
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
        ];
    } else {
        // General links
        links = [
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
            // Learning section
            {
                label: "Get Tutored",
                href: route("getTutored.index"),
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                ),
            },
            {
                label: "Get Mentored",
                href: route("getMentored.index"),
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                ),
            },
            // Tutoring section (for tutors)
            ...(user.is_tutor
                ? [
                      {
                          label: "Tution Requests",
                          href: route("tutionRequests.index"),
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
                                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                  />
                              </svg>
                          ),
                      },
                      {
                          label: "Tutor's Bookings",
                          href: route("tutor.bookings"),
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
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                              </svg>
                          ),
                      },
                  ]
                : []),
            // Mentoring section (for mentors)
            // (No Mentor Requests link, as this feature does not exist)
            // Course section
            {
                href: route("courses.my"),
                label: "My Courses",
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
                ),
            },
            {
                id: "publish-course",
                href: route("CourseRegistration"),
                label: "Publish Course",
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
                            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        />
                    </svg>
                ),
            },
            {
                href: "/courses/lessons",
                label: "Add Course Content",
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
                            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        />
                    </svg>
                ),
            },
            // Messaging
            {
                href: route("chats.conversations"),
                label: "Messages",
                icon: (
                    <div className="relative">
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
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        {user?.unread_message_count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {user?.unread_message_count > 9
                                    ? "9+"
                                    : user?.unread_message_count}
                            </span>
                        )}
                    </div>
                ),
            },
            // Registration links (if not already mentor/tutor)
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
                          href: route("tutorRegistration.create"),
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
                name: "My Tution Sessions",
                label: "My Tution Sessions",
                href: route("tuition-sessions.index"),
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                        />
                    </svg>
                ),
                current: route().current("tuition-sessions.index"),
            },
        ];
    }

    return (
        <aside className="h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col shadow-lg z-20 md:fixed md:top-0 md:left-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-6 flex-shrink-0">
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
            <nav className="flex-1 px-3 md:px-4 space-y-1 md:space-y-2 overflow-y-auto pb-4">
                {links.map((link) => (
                    <Link
                        key={link.href || link.label}
                        href={link.href}
                        method={link.method || "get"}
                        as={link.as || "a"}
                        className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition"
                        {...(link.method === "post" &&
                        link.href === route("logout")
                            ? { onSuccess: () => window.location.reload() }
                            : {})}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
