import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function MentorRegistration() {
    const { data, setData, post, processing, errors, reset } = useForm({
        year_of_study: "",
        course: "",
        skills: "",
        hobbies: "",
        work_experience: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("MentorRegistration"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
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
            }
        >
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
                                <InputLabel htmlFor="year_of_study" value="Year of Study" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <select
                                        id="year_of_study"
                                        name="year_of_study"
                                        value={data.year_of_study}
                                        onChange={e => setData("year_of_study", e.target.value)}
                                        className="mt-1 block w-full pl-10 rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400"
                                        required
                                    >
                                        <option value="" disabled>Select year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>
                                <InputError message={errors.year_of_study} className="mt-2" />
                            </div>
                            {/* Course */}
                            <div>
                                <InputLabel htmlFor="course" value="Course" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <input
                                        id="course"
                                        type="text"
                                        name="course"
                                        value={data.course}
                                        onChange={e => setData("course", e.target.value)}
                                        className="w-full border border-blue-200 rounded-lg pl-10 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                        required
                                    />
                                </div>
                                <InputError message={errors.course} className="mt-2" />
                            </div>
                            {/* Skills */}
                            <div>
                                <InputLabel htmlFor="skills" value="Skills" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="skills"
                                        type="text"
                                        name="skills"
                                        value={data.skills}
                                        onChange={e => setData("skills", e.target.value)}
                                        className="w-full border border-blue-200 rounded-lg pl-10 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                    />
                                </div>
                                <InputError message={errors.skills} className="mt-2" />
                            </div>
                            {/* Hobbies */}
                            <div>
                                <InputLabel htmlFor="hobbies" value="Hobbies" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="hobbies"
                                        type="text"
                                        name="hobbies"
                                        value={data.hobbies}
                                        onChange={e => setData("hobbies", e.target.value)}
                                        className="w-full border border-blue-200 rounded-lg pl-10 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                    />
                                </div>
                                <InputError message={errors.hobbies} className="mt-2" />
                            </div>
                            {/* Work Experience */}
                            <div>
                                <InputLabel htmlFor="work_experience" value="Work Experience" />
                                <div className="relative">
                                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <textarea
                                        id="work_experience"
                                        name="work_experience"
                                        value={data.work_experience}
                                        onChange={e => setData("work_experience", e.target.value)}
                                        className="w-full border border-blue-200 rounded-lg pl-10 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                                        rows={3}
                                    />
                                </div>
                                <InputError message={errors.work_experience} className="mt-2" />
                            </div>
                            <PrimaryButton
                                className="w-full flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-200 mt-4"
                                disabled={processing}
                            >
                                Register as Mentor
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}