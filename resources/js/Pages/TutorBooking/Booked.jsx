import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Booked({ tutor }) {
    return (
        <AuthenticatedLayout>
            <Head title="Session Booked!" />
            <div className="py-10 min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-green-100 relative overflow-hidden">
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <img
                                src={
                                    tutor.pfp
                                        ? `/storage/pfps/${tutor.pfp}`
                                        : "/default-avatar.png"
                                }
                                alt={tutor.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow-lg mb-2"
                            />
                            <h1 className="text-3xl font-extrabold text-green-700 drop-shadow tracking-tight mb-1">
                                Session Booked!
                            </h1>
                            <p className="text-gray-600 text-center max-w-xl mb-2">
                                Your tutoring session with{" "}
                                <span className="font-bold text-blue-700">
                                    {tutor.name}
                                </span>{" "}
                                has been successfully booked.
                            </p>
                        </div>

                        <div className="flex justify-center mt-8">
                            <a
                                href={route("dashboard")}
                                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all duration-200 text-lg"
                            >
                                Go to Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
