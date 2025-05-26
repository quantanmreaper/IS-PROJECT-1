import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 px-4">
                <div className="bg-white/90 dark:bg-blue-900/80 rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col items-center max-w-md w-full">
                    <div className="flex flex-col items-center w-full">
                        <div className="w-20 h-20 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-12 h-12 text-blue-600 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-white mb-2 text-center">Welcome!</h1>
                        <p className="text-base sm:text-lg text-blue-900 dark:text-blue-100 mb-8 text-center">
                            We're glad to have you here.<br className="hidden sm:block" /> Please log in or register to continue.
                        </p>
                    </div>
                    <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                        <Link
                            href={route('login')}
                            className="rounded-lg px-8 py-3 bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 text-center"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-lg px-8 py-3 bg-white text-blue-700 font-semibold border border-blue-600 shadow hover:bg-blue-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 text-center"
                        >
                            Register
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}