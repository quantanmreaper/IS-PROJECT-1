import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-blue-900/80 shadow-md fixed top-0 left-0 z-10">
            <div className="text-2xl font-bold text-blue-700 dark:text-white">
                <Link href="/" className="hover:text-blue-900">
                    Peer Tutoring & Mentorship
                </Link>
            </div>
            <div className="flex gap-6">
                {auth && auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="text-blue-700 dark:text-blue-100 font-semibold hover:underline transition"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="text-blue-700 dark:text-blue-100 font-semibold hover:underline transition"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="text-blue-700 dark:text-blue-100 font-semibold hover:underline transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
