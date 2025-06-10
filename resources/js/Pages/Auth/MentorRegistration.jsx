import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function MentorRegistration() {
    const [form, setForm] = useState({
        year_of_study: "",
        course: "",
        skills: "",
        hobbies: "",
        work_experience: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('MentorRegistration'), {
            onSuccess: () => {}, // You can add a callback here if needed
        });
    };

    return (
        <AuthenticatedLayout header={
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        {/* Mentor/Star Icon */}
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 017 7c0 2.386-1.053 4.09-2.25 5.25C15.053 15.09 15 16 15 17v1a3 3 0 01-6 0v-1c0-1-.053-1.91-1.75-2.75C6.053 13.09 5 11.386 5 9a7 7 0 017-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" />
                    </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 drop-shadow tracking-tight">
                        Mentor Registration
                    </h2>
                </div>
            }>
            <Head title="Mentor Registration" />
            <div className="py-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                        
           
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-extrabold text-blue-700 mb-2 drop-shadow">Become a Mentor</h1>
                            <p className="text-gray-600">Share your knowledge, inspire others, and grow your skills. Fill in the details below to join our mentor community!</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
                            {/* Year of Study */}
                            <div>
                            <label className="block mb-1 font-semibold text-blue-700">Year of Study</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {/* Calendar Icon */}
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
                                        </svg>
                                    </span>
                                    <select
                                        name="year_of_study"
                                        value={form.year_of_study}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                        required
                                    >
                                        <option value="" disabled>Select year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>
                            </div>
                            {/* Course */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">Course</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        {/* Book Icon */}
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3a1 1 0 01-1-1V5a1 1 0 011-1h9" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="course"
                                        value={form.course}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Skills */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">Skills</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        {/* Star Icon */}
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={form.skills}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                        //placeholder="Comma separated"
                                    />
                                </div>
                            </div>
                            {/* Hobbies */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">Hobbies</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        {/* Heart Icon */}
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="hobbies"
                                        value={form.hobbies}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                        //placeholder="Comma separated"
                                    />
                                </div>
                            </div>
                            {/* Work Experience */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">Work Experience</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-4">
                                        {/* Briefcase Icon */}
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <rect x="2" y="7" width="20" height="14" rx="2" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M2 7h20" />
                                        </svg>
                                    </span>
                                    <textarea
                                        name="work_experience"
                                        value={form.work_experience}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                        rows={3}
                                        //placeholder="Tell us about your experience"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-200 mt-4"
                            >
                                Register as Mentor
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}