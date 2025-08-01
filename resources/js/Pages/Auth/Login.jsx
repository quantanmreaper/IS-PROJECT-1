import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import Navbar from "@/Components/Navbar";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => window.location.reload(),
            onFinish: () => reset("password"),
        });
    };

    // SVG icons for fields
    const icons = {
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
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <Navbar />
            <div className="w-full max-w-md bg-white/95 dark:bg-blue-900/90 rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex flex-col items-center mb-8">
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
                                d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm2 6a6 6 0 0 0-12 0"
                            />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-blue-700 dark:text-white mb-2 tracking-tight drop-shadow">
                        Welcome Back!
                    </h2>
                    <p className="text-base text-blue-900 dark:text-blue-100 text-center">
                        Log in to your account
                    </p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-blue-700 dark:text-blue-100"
                        />
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                {icons.email}
                            </span>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-blue-700 dark:text-blue-100"
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
                                className="pl-10 mt-1 block w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-400"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-blue-700 dark:text-blue-100">
                                Remember me
                            </span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-blue-600 hover:underline dark:text-blue-200"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton
                            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-8 rounded-xl shadow-lg transition-all duration-200"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <span className="text-sm text-blue-900 dark:text-blue-100">
                        Don't have an account?{" "}
                    </span>
                    <Link
                        href={route("register")}
                        className="text-blue-600 hover:underline font-semibold dark:text-blue-200"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
