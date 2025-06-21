import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function TutorsList({ tutors }) {
    return (
        <AuthenticatedLayout>
            <Head title="Tutors List" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6">
                            <h1 className="text-3xl font-bold text-blue-700 mb-8">
                                Available Tutors
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {tutors.map((tutor) => (
                                    <div
                                        key={tutor.id}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
                                    >
                                        <img
                                            src={
                                                tutor.pfp
                                                    ? `/storage/${tutor.pfp}`
                                                    : "/defaultpfp.png"
                                            }
                                            alt={tutor.name}
                                            className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-300"
                                        />
                                        <h2 className="text-xl font-semibold text-blue-800">
                                            {tutor.name}
                                        </h2>
                                        {/* <p className="text-gray-600 text-center mt-2 mb-2">
                                            {tutor.bio}
                                        </p> */}
                                        <div className="text-blue-700 font-bold mb-2">
                                            Hourly Rate: Ksh{" "}
                                            {tutor.hourly_rate ?? "N/A"}
                                        </div>
                                        <a
                                            href={route(
                                                "getTutored.show",
                                                tutor.id
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
