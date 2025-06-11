import { useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import Select from "react-select";

export default function TutorRegistration({ units }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        progress_report: null,
        hourly_rate: "",
        units: [],
        available_from: "",
        available_until: "",
    });

    const fileInput = useRef();

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setData(name, type === "file" ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("TutorRegistration.store"), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const unitOptions = units.map((unit) => ({
        value: unit.id,
        label: unit.name,
    }));

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
                        Tutor Registration
                    </h2>
                </div>
            }
        >
            <Head title="Tutor Registration" />
            <div className="pt-6 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-extrabold text-blue-700 mb-2 drop-shadow">
                                Become a Tutor
                            </h1>
                            <p className="text-gray-600">
                                Upload your progress report and set your hourly
                                rate to join as a tutor.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 z-10 relative"
                            encType="multipart/form-data"
                        >
                            {/* Progress Report */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Progress Report (PDF)
                                </label>
                                <input
                                    type="file"
                                    name="progress_report"
                                    accept="application/pdf"
                                    ref={fileInput}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                />
                                {errors.progress_report && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.progress_report}
                                    </div>
                                )}
                            </div>

                            {/* Hourly Rate */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Hourly Rate (Ksh)
                                </label>
                                <input
                                    type="number"
                                    name="hourly_rate"
                                    value={data.hourly_rate}
                                    onChange={handleChange}
                                    min="100"
                                    step="100"
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                />
                                {errors.hourly_rate && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.hourly_rate}
                                    </div>
                                )}
                            </div>

                            {/* Units Multi-Select */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Select Units You Can Teach
                                </label>
                                <Select
                                    isMulti
                                    options={unitOptions}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    value={unitOptions.filter((option) =>
                                        data.units.includes(option.value)
                                    )}
                                    onChange={(selected) => {
                                        setData(
                                            "units",
                                            selected.map((opt) => opt.value)
                                        );
                                    }}
                                    placeholder="Click to select units..."
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: "#bfdbfe",
                                            boxShadow: "none",
                                            padding: "4px",
                                        }),
                                        multiValue: (styles) => ({
                                            ...styles,
                                            backgroundColor: "#e0f2fe",
                                        }),
                                        multiValueLabel: (styles) => ({
                                            ...styles,
                                            color: "#2563eb",
                                            fontWeight: "500",
                                        }),
                                        multiValueRemove: (styles) => ({
                                            ...styles,
                                            color: "#1e40af",
                                            ":hover": {
                                                backgroundColor: "#93c5fd",
                                                color: "#1e3a8a",
                                            },
                                        }),
                                    }}
                                />
                                {errors.units && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.units}
                                    </div>
                                )}
                            </div>

                            {/* Availability */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold text-blue-700">
                                        Available From
                                    </label>
                                    <input
                                        type="time"
                                        name="available_from"
                                        value={data.available_from}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                        required
                                    />
                                    {errors.available_from && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.available_from}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold text-blue-700">
                                        Available Until
                                    </label>
                                    <input
                                        type="time"
                                        name="available_until"
                                        value={data.available_until}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                        required
                                    />
                                    {errors.available_until && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.available_until}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-200 mt-4"
                            >
                                Register as Tutor
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
