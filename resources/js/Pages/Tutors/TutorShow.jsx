import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function TutorShow({ tutor }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Tutor: ${tutor.name}`} />
            <div className="py-10 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <img
                                src={
                                    tutor.pfp
                                        ? `/storage/pfps/${tutor.pfp}`
                                        : "/default-avatar.png"
                                }
                                alt={tutor.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-lg mb-2"
                            />
                            <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow tracking-tight mb-1">
                                {tutor.name}
                            </h1>
                            {tutor.bio && (
                                <p className="text-gray-600 text-center max-w-xl mb-2">
                                    {tutor.bio}
                                </p>
                            )}
                            <div className="flex flex-col items-center gap-2">
                                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                                    Hourly Rate: Ksh{" "}
                                    {tutor.hourly_rate ?? "N/A"}
                                </span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-blue-800 mb-3">
                                Units Taught
                            </h2>
                            {tutor.units && tutor.units.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {tutor.units.map((unit, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                                        >
                                            {typeof unit === "string"
                                                ? unit
                                                : unit.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    No units listed.
                                </div>
                            )}
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-blue-800 mb-3">
                                Availability
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                                    Start: {tutor.availability_start ?? "N/A"}
                                </span>
                                <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold">
                                    Stop: {tutor.availability_stop ?? "N/A"}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-8">
                            <a
                                href={route("getTutored.show", tutor.id)}
                                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all duration-200 text-lg"
                            >
                                Book a Session
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
