import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import React, { useState } from "react";

export default function TutorBookingCreate({ tutor, units }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        unit_id: "",
        session_datetime: "",
        duration: "1",
        notes: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(route("bookTutor.store", tutor.id), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.redirect) {
                window.location.href = result.redirect;
            } else if (result.error) {
                setLoading(false);
                alert(result.error);
            }
        } catch (err) {
            setLoading(false);
            alert("Failed to book session. Please try again.");
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg
                            className="w-7 h-7 text-white"
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
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 drop-shadow tracking-tight">
                        Book a Session with {tutor.name}
                    </h2>
                </div>
            }
        >
            <Head title="Book Tutor Session" />
            <div className="pt-6 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
                                <svg
                                    className="animate-spin h-10 w-10 text-blue-600 mb-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                                <span className="text-blue-700 font-semibold text-lg">
                                    Redirecting to payment...
                                </span>
                            </div>
                        )}
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-extrabold text-blue-700 mb-2 drop-shadow">
                                Book a Tutoring Session
                            </h1>
                            <p className="text-gray-600">
                                Select a unit and date/time to book your session
                                with this tutor.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 z-10 relative"
                        >
                            {/* Unit Select */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Unit
                                </label>
                                <select
                                    name="unit_id"
                                    value={data.unit_id}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                >
                                    <option value="">Select a unit</option>
                                    {units.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.unit_id && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.unit_id}
                                    </div>
                                )}
                            </div>
                            {/* DateTime */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Session Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="session_datetime"
                                    value={data.session_datetime}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                />
                                {errors.session_datetime && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.session_datetime}
                                    </div>
                                )}
                            </div>
                            {/* Duration */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Duration (hours)
                                </label>
                                <select
                                    name="duration"
                                    value={data.duration}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                >
                                    {[1, 2, 3, 4, 5].map((hour) => (
                                        <option key={hour} value={hour}>
                                            {hour} hour{hour > 1 ? "s" : ""}
                                        </option>
                                    ))}
                                </select>
                                {errors.duration && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.duration}
                                    </div>
                                )}
                            </div>
                            {/* Notes */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Notes (optional)
                                </label>
                                <textarea
                                    name="notes"
                                    value={data.notes}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white min-h-[80px]"
                                    placeholder="Add any notes for the tutor..."
                                />
                                {errors.notes && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.notes}
                                    </div>
                                )}
                            </div>
                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-200 mt-4"
                            >
                                Book Session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
