import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function MentorList({ mentors }) {
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
            <Head title="Mentors List" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6">
                            <h1 className="text-3xl font-bold text-blue-700 mb-8">
                                Available Mentors
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {mentors.map((mentor) => (
                                    <div
                                        key={mentor.id}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
                                    >
                                        <img
                                            src={
                                                mentor.pfp
                                                    ? mentor.pfp.includes(
                                                          "pfps/"
                                                      )
                                                        ? `/storage/${mentor.pfp}`
                                                        : `/storage/pfps/${mentor.pfp}`
                                                    : "/default-avatar.png"
                                            }
                                            alt={mentor.name}
                                            className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-300"
                                        />
                                        <h2 className="text-xl font-semibold text-blue-800">
                                            {mentor.name}
                                        </h2>
                                        <div className="text-blue-700 font-bold mb-2">
                                            {yearMap[mentor.year_of_study] ??
                                                "N/A"}
                                        </div>
                                        <a
                                            href={route(
                                                "getMentored.show",
                                                mentor.id
                                            )}
                                            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
                                        >
                                            View Details
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
