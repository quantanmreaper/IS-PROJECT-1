import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function MentorShow({ mentor }) {
    // Map year_of_study number to string
    const yearMap = {
        1: "1st Year Student",
        2: "2nd Year Student",
        3: "3rd Year Student",
        4: "4th Year Student",
        5: "5th Year Student",
    };
    return (
        <AuthenticatedLayout>
            <Head title={`Mentor: ${mentor.name}`} />
            <div className="py-10 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white/95 p-10 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <img
                                src={
                                    mentor.pfp
                                        ? `/storage/pfps/${mentor.pfp}`
                                        : "/default-avatar.png"
                                }
                                alt={mentor.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-lg mb-2"
                            />
                            <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow tracking-tight mb-1">
                                {mentor.name}
                            </h1>
                            {mentor.bio && (
                                <p className="text-gray-600 text-center max-w-xl mb-2">
                                    {mentor.bio}
                                </p>
                            )}
                        </div>

                        <div className="mt-8 w-full">
                            <h2 className="text-2xl font-bold text-blue-800 mb-5 text-center">
                                Mentor Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {mentor.year_of_study && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-blue-700 mb-1">
                                            Year of Study
                                        </span>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold w-fit">
                                            {yearMap[mentor.year_of_study] ??
                                                "N/A"}
                                        </span>
                                    </div>
                                )}
                                {mentor.course && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-blue-700 mb-1">
                                            Course
                                        </span>
                                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium w-fit">
                                            {mentor.course}
                                        </span>
                                    </div>
                                )}
                                {mentor.skills && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-blue-700 mb-1">
                                            Skills
                                        </span>
                                        <span className="bg-green-50 text-green-800 px-3 py-1 rounded-lg text-sm font-medium w-fit">
                                            {mentor.skills}
                                        </span>
                                    </div>
                                )}
                                {mentor.hobbies && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-blue-700 mb-1">
                                            Hobbies
                                        </span>
                                        <span className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-lg text-sm font-medium w-fit">
                                            {mentor.hobbies}
                                        </span>
                                    </div>
                                )}
                                {mentor.work_experience && (
                                    <div className="flex flex-col sm:col-span-2">
                                        <span className="font-semibold text-blue-700 mb-1">
                                            Work Experience
                                        </span>
                                        <span className="bg-purple-50 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium block">
                                            {mentor.work_experience}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center mt-8">
                            <a
                                href={route("chat.show", mentor.id)}
                                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all duration-200 text-lg"
                            >
                                    Chat
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
