import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Sidebar from "@/Components/Sidebar";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

export default function AuthenticatedLayout({
    header,
    children,
    hideSearch = false,
}) {
    const { flash } = usePage().props;
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(
        user.unread_message_count || 0
    );

    useEffect(() => {
        if (flash && flash.success) {
            toastr.success(flash.success);
        }
        if (flash && flash.error) {
            toastr.error(flash.error);
        }
        if (flash && flash.message) {
            toastr.success(flash.message);
        }

        // Extract the current chat user ID from the URL if we're in a chat
        const pathParts = window.location.pathname.split("/");
        const isChatPage = pathParts[1] === "chat";
        const chatUserId = isChatPage ? parseInt(pathParts[2], 10) : null;

        // Listen for new messages
        if (window.Echo) {
            const channel = window.Echo.private(`chat.${user.id}`);

            channel.listen(".MessageSent", (data) => {
                // Only increment unread count if we're not currently in a chat with this user
                if (!isChatPage || data.user.id !== chatUserId) {
                    // Update unread count
                    setUnreadCount((prev) => prev + 1);

                    // Show notification
                    toastr.info(`New message from ${data.user.name}`);
                }
            });

            return () => {
                channel.stopListening(".MessageSent");
            };
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Desktop sidebar */}
            <div className="hidden md:block">
                <Sidebar
                    user={{ ...user, unread_message_count: unreadCount }}
                />
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Sidebar */}
                    <div className="fixed inset-y-0 left-0 w-64 z-50">
                        <Sidebar
                            user={{
                                ...user,
                                unread_message_count: unreadCount,
                            }}
                            mobile={true}
                            closeSidebar={() => setSidebarOpen(false)}
                        />
                    </div>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                </div>
            )}

            <div className="flex-1 md:ml-64">
                {/* Top bar with search */}
                <div className="bg-white px-4 sm:px-6 md:px-8 py-4 md:py-6 shadow flex items-center justify-between">
                    {/* Hamburger menu for mobile */}
                    <button
                        type="button"
                        className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Left side - can be used for title or search */}
                    <div className="flex-1">
                        <div className="text-xl font-semibold text-gray-800">
{/*                             Peer Mentor & Tutoring
 */}                        </div>
                    </div>

                    {/* Right side - user dropdown */}
                    <div className="flex items-center">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="mr-1">{user.name}</span>
                                    </div>
                                    <svg
                                        className="ml-2 -mr-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                 onClick={() => {
                                        // Wait a moment to allow logout to complete, then reload
                                        setTimeout(() => window.location.reload(), 500);
                                    }}
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                {/* Page Header */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
               
                <main>{children}</main>
            </div>
        </div>
    );
}
