import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function MentorList({ mentors }) {
    // Defensive: always use an array
    const mentorsList = Array.isArray(mentors) ? mentors : [];
    // Map year_of_study number to string
    const yearMap = {
        1: "1st Year Student",
        2: "2nd Year Student",
        3: "3rd Year Student",
        4: "4th Year Student",
        //5: "5th Year Student",
    };

    //  mentor data for searching/filtering
    const normalizedMentors = useMemo(
        () =>
            mentorsList.map((mentor) => {
                const skills = Array.isArray(mentor.skills)
                    ? mentor.skills
                    : (mentor.skills || "")
                          .toString()
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean);
                const hobbies = Array.isArray(mentor.hobbies)
                    ? mentor.hobbies
                    : (mentor.hobbies || "")
                          .toString()
                          .split(",")
                          .map((h) => h.trim())
                          .filter(Boolean);
                const yearOfStudyText = yearMap[mentor.year_of_study] || "";
                return {
                    ...mentor,
                    course: mentor.course || "",
                    skills,
                    hobbies,
                    yearOfStudyText,
                    allTags: [mentor.course, ...skills, ...hobbies].filter(
                        Boolean
                    ),
                };
            }),
        [mentorsList]
    );

    const [searchTerm, setSearchTerm] = useState("");

    // Filter mentors (search only)
    const filteredMentors = useMemo(() => {
        return normalizedMentors.filter((mentor) => {
            const search = searchTerm.toLowerCase();
            return (
                mentor.name.toLowerCase().includes(search) ||
                mentor.course.toLowerCase().includes(search) ||
                mentor.yearOfStudyText.toLowerCase().includes(search) ||
                mentor.skills.some((s) => s.toLowerCase().includes(search)) ||
                mentor.hobbies.some((h) => h.toLowerCase().includes(search))
            );
        });
    }, [normalizedMentors, searchTerm]);

    return (
        <AuthenticatedLayout>
            <Head title="Mentors List" />
            <div className="py-6 md:py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-xl overflow-hidden mb-8 relative">
                        <div className="px-4 sm:px-8 py-8 sm:py-12 max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                                Find Your Perfect Mentor
                            </h1>
                            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-blue-100">
                                Connect with experienced mentors to guide your
                                academic and personal growth
                            </p>
                            <div className="mt-6 sm:mt-8 bg-white rounded-lg p-2 flex flex-col sm:flex-row items-center shadow-lg">
                                <input
                                    type="text"
                                    placeholder="Search mentors by name, course, year of study, skill, or hobby..."
                                    className="w-full border-0 focus:ring-0 px-4 py-3 text-gray-700 placeholder-gray-400 rounded-lg"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 lg:block hidden">
                            <div className="h-full bg-opacity-50 flex items-center justify-center">
                                <svg
                                    className="w-64 h-64 text-white opacity-10"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6">
                            <h1 className="text-3xl font-bold text-blue-700 mb-8">
                                Available Mentors
                            </h1>
                            {/* Mentor Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                                {filteredMentors.map((mentor) => {
                                    // Use normalized arrays, fallback to [] if null/undefined
                                    const skills = Array.isArray(mentor.skills)
                                        ? mentor.skills
                                        : [];
                                    const hobbies = Array.isArray(
                                        mentor.hobbies
                                    )
                                        ? mentor.hobbies
                                        : [];
                                    return (
                                        <div
                                            key={mentor.id}
                                            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg flex flex-col h-full border border-gray-100 hover:border-blue-300"
                                        >
                                            {/* Card Header with blue gradient background and Avatar */}
                                            <div className="relative p-3 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center">
                                                <div className="relative mr-3">
                                                    <img
                                                        src={
                                                            mentor.pfp
                                                                ? `/storage/${mentor.pfp}`
                                                                : "/default-avatar.png"
                                                        }
                                                        alt={mentor.name}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="font-bold text-base text-white">
                                                        {mentor.name}
                                                    </h2>
                                                </div>
                                            </div>
                                            {/* Card Body */}
                                            <div className="p-6 flex-1 flex flex-col bg-white">
                                                {/* Course & Year Section (now styled like skills/hobbies) */}
                                                <div className="mb-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                    <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                                                        <svg
                                                            className="w-5 h-5 mr-2 text-blue-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7"
                                                            />
                                                        </svg>
                                                        Course & Year
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 items-center">
                                                        <span className="px-3 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                                                            {mentor.course ||
                                                                "N/A"}
                                                        </span>
                                                        <span className="px-3 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                                                            {yearMap[
                                                                mentor
                                                                    .year_of_study
                                                            ] ?? "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Skills Section */}
                                                <div className="mb-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                    <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                                                        <svg
                                                            className="w-5 h-5 mr-2 text-blue-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                            />
                                                        </svg>
                                                        Skills
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 items-center">
                                                        {skills.length > 0 ? (
                                                            skills
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        skill,
                                                                        idx
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="px-3 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200"
                                                                        >
                                                                            {
                                                                                skill
                                                                            }
                                                                        </span>
                                                                    )
                                                                )
                                                        ) : (
                                                            <span className="text-gray-500 text-xs">
                                                                No skills listed
                                                            </span>
                                                        )}
                                                        {skills.length > 3 && (
                                                            <span className="text-xs text-blue-600 ml-2">
                                                                +{" "}
                                                                {skills.length -
                                                                    3}{" "}
                                                                more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Hobbies Section */}
                                                <div className="mb-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                    <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                                                        <svg
                                                            className="w-5 h-5 mr-2 text-blue-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v4m-4-4h8"
                                                            />
                                                        </svg>
                                                        Hobbies
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 items-center">
                                                        {hobbies.length > 0 ? (
                                                            hobbies
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        hobby,
                                                                        idx
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="px-3 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200"
                                                                        >
                                                                            {
                                                                                hobby
                                                                            }
                                                                        </span>
                                                                    )
                                                                )
                                                        ) : (
                                                            <span className="text-gray-500 text-xs">
                                                                No hobbies
                                                                listed
                                                            </span>
                                                        )}
                                                        {hobbies.length > 3 && (
                                                            <span className="text-xs text-blue-600 ml-2">
                                                                +{" "}
                                                                {hobbies.length -
                                                                    3}{" "}
                                                                more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* View Details Button */}
                                                <div className="mt-auto pt-4">
                                                    <a
                                                        href={route(
                                                            "getMentored.show",
                                                            mentor.id
                                                        )}
                                                        className="group w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-center font-medium rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm"
                                                    >
                                                        <span>
                                                            View Details
                                                        </span>
                                                        <svg
                                                            className="h-4 w-4 ml-2 transform transition-transform duration-200 group-hover:translate-x-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                            />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
