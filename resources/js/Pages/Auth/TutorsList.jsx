import React from "react";

export default function TutorsList({ tutors }) {
    return (
        <div className="min-h-screen bg-blue-50 py-10">
            <div className="max-w-6xl mx-auto px-4">
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
                                        ? `/storage/pfps/${tutor.pfp}`
                                        : "/default-avatar.png"
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
                                Hourly Rate: Ksh {tutor.hourly_rate ?? "N/A"}
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {tutor.units.map((unit, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                    >
                                        {unit}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
