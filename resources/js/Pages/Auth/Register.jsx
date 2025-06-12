import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import Navbar from "@/Components/Navbar";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        //usertype: "",
        bio: "",
        profile_photo: null,
        student_id: null,
        phone: "",
        gender: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    // SVG icons for fields
    const icons = {
        name: (
            <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
        email: (
            <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7l9 6 9-6"
                />
            </svg>
        ),
        bio: (
            <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16h8M8 12h8m-8-4h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
        profile_photo: (
            <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-3.382a1 1 0 01-.894-.553l-.724-1.447A1 1 0 0012 2h0a1 1 0 00-.894.553l-.724 1.447A1 1 0 009.382 5H6a2 2 0 00-2 2z"
                />
                <circle cx="12" cy="13" r="4" />
            </svg>
        ),
        phone: (
            <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zm8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z"
                />
            </svg>
        ),
        password: (
            <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm6 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z"
                />
            </svg>
        ),
        password_confirmation: (
            <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        ),
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-200 via-white to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 transition-colors duration-500 py-8">
                <div className="w-full max-w-lg bg-white/95 dark:bg-blue-900/90 rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-blue-200 dark:border-blue-800 relative overflow-hidden">
                    {/* Decorative background shapes */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 dark:bg-blue-800 rounded-full opacity-30 blur-2xl z-0"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 dark:bg-blue-700 rounded-full opacity-20 blur-2xl z-0"></div>
                    <div className="flex flex-col items-center mb-8 z-10 relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 flex items-center justify-center mb-4 shadow-xl">
                            <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-extrabold text-blue-600 dark:text-white mb-2 tracking-tight drop-shadow">
                            Create Your Account
                        </h2>
                        <p className="text-base text-blue-900 dark:text-blue-100 text-center">
                            Join our platform and start your journey!
                        </p>
                    </div>
                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="space-y-5 z-10 relative"
                    >
                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {icons.name}
                                </span>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white/80 dark:bg-blue-950/60"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {icons.email}
                                </span>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white/80 dark:bg-blue-950/60"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        {/* Gender */}
                        <div>
                            <InputLabel htmlFor="gender" value="Gender" />
                            <div className="relative">
                                <select
                                    id="gender"
                                    name="gender"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white/80 dark:bg-blue-950/60 pl-3 pr-8 py-2"
                                    required
                                >
                                    <option value="" disabled>
                                        Select gender
                                    </option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                            </div>
                            <InputError
                                message={errors.gender}
                                className="mt-2"
                            />
                        </div>
                        {/* Phone */}
                        <div>
                            <InputLabel
                                htmlFor="phone"
                                value="Phone Number"
                            />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {icons.phone}
                                </span>
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={data.phone}
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white/80 dark:bg-blue-950/60"
                                    autoComplete="tel"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    placeholder="e.g. 07123456789"
                                />
                            </div>
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                        {/* Bio */}
                        <div>
                            <InputLabel htmlFor="bio" value="Bio" />
                            <div className="relative">
                                <span className="absolute left-3 top-4">
                                    {icons.bio}
                                </span>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={data.bio}
                                    onChange={(e) =>
                                        setData("bio", e.target.value)
                                    }
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white/80 dark:bg-blue-950/60"
                                    rows={3}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                            <InputError message={errors.bio} className="mt-2" />
                        </div>
                        {/* Student ID */}
                        <div>
                            <InputLabel
                                htmlFor="student_id"
                                value="Student ID"
                            />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {icons.profile_photo}
                                </span>
                                <input
                                    id="student_id"
                                    name="student_id"
                                    type="file"
                                    accept="image/*,.pdf"
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white"
                                    onChange={(e) =>
                                        setData(
                                            "student_id",
                                            e.target.files[0]
                                        )
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.student_id}
                                className="mt-2"
                            />
                        </div>
                        {/* Profile Photo */}
                        <div>
                            <InputLabel
                                htmlFor="profile_photo"
                                value="Profile Photo"
                            />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {icons.profile_photo}
                                </span>
                                <input
                                    id="profile_photo"
                                    name="profile_photo"
                                    type="file"
                                    accept="image/*"
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white"
                                    onChange={(e) =>
                                        setData(
                                            "profile_photo",
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </div>
                            <InputError
                                message={errors.profile_photo}
                                className="mt-2"
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                            />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {icons.password}
                                </span>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white/80 dark:bg-blue-950/60"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        {/* Confirm Password */}
                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {icons.password_confirmation}
                                </span>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400 bg-white/80 dark:bg-blue-950/60"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <Link
                                href={route("login")}
                                className="text-blue-600 hover:underline font-semibold dark:text-blue-200 transition-colors duration-200"
                            >
                                Log In
                            </Link>
                            <PrimaryButton
                                className="ms-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
