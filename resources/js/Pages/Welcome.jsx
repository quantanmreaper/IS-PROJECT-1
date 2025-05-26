import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            {/* Navbar */}
            <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-blue-900/80 shadow-md fixed top-0 left-0 z-10">
                <div className="text-2xl font-bold text-blue-700 dark:text-white">
                    Peer Tutoring
                </div>
                <div className="flex gap-6">
                    <Link
                        href={route('login')}
                        className="text-blue-700 dark:text-blue-100 font-semibold hover:underline transition"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="text-blue-700 dark:text-blue-100 font-semibold hover:underline transition"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 pt-24 px-6 text-center">
    <div className="w-full max-w-5xl px-4">
        <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-600 dark:text-white leading-tight">
                Peer Tutoring & Mentorship Platform
            </h1>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-blue-900 dark:text-blue-100 mb-10 max-w-3xl mx-auto">
            Connect with mentors, collaborate with peers, and grow your skills in a supportive student-driven environment.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
                href={route('register')}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
            >
                Get Started
            </Link>
            <Link
                href={route('login')}
                className="bg-white dark:bg-blue-800 border border-blue-600 text-blue-700 dark:text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-100 dark:hover:bg-blue-700 transition shadow"
            >
                Log In
            </Link>
        </div>
    </div>
</section>

        </>
    );
}
