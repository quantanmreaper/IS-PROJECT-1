import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import DataTable from "react-data-table-component";

export default function TutionRequestsIndex({ requests }) {
    // Custom styles for DataTable
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#EBF5FF",
                borderRadius: "0.5rem",
                color: "#2563EB",
                fontWeight: "bold",
                fontSize: "0.95rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                minHeight: "56px",
                paddingLeft: "16px",
                paddingRight: "16px",
            },
        },
        rows: {
            style: {
                fontSize: "0.95rem",
                fontWeight: "500",
                color: "#334155",
                minHeight: "60px",
                "&:hover": {
                    backgroundColor: "#F1F5F9",
                    cursor: "pointer",
                    transform: "translateY(-2px)",
                    boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    transition: "all 0.2s ease",
                },
            },
            highlightOnHoverStyle: {
                backgroundColor: "#F0F9FF",
                borderRadius: "8px",
                outline: "1px solid #BFDBFE",
                transition: "all 0.3s ease",
            },
        },
        pagination: {
            style: {
                fontSize: "0.9rem",
                minHeight: "56px",
                borderTopStyle: "none",
            },
            pageButtonsStyle: {
                backgroundColor: "transparent",
                fill: "#2563EB",
                "&:hover:not(:disabled)": {
                    backgroundColor: "#EBF5FF",
                },
                "&:focus": {
                    outline: "none",
                },
                borderRadius: "6px",
            },
        },
    };

    const columns = [
        {
            name: "Unit",
            selector: (row) => row.unit?.name ?? "-",
            sortable: true,
            cell: (row) => (
                <div className="font-medium text-gray-800">
                    {row.unit?.name ?? "-"}
                </div>
            ),
            sortIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                </svg>
            ),
        },
        {
            name: "Student",
            selector: (row) => row.tutee?.name ?? "-",
            sortable: true,
            cell: (row) => (
                <div className="font-medium text-blue-700 hover:text-blue-800">
                    {row.tutee?.name ?? "-"}
                </div>
            ),
        },
        {
            name: "Duration",
            selector: (row) => row.duration,
            sortable: true,
            cell: (row) => (
                <div className="bg-blue-50 rounded-full px-3 py-1 text-blue-700 font-semibold text-xs tracking-wide">
                    {row.duration} {row.duration === 1 ? "hour" : "hours"}
                </div>
            ),
        },
        {
            name: "Start Time",
            selector: (row) => row.scheduled_start,
            sortable: true,
            cell: (row) => (
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span>{row.scheduled_start}</span>
                </div>
            ),
        },
        {
            name: "End Time",
            selector: (row) => row.scheduled_stop,
            sortable: true,
            cell: (row) => (
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{row.scheduled_stop}</span>
                </div>
            ),
        },
        {
            name: "Status",
            selector: (row) => row.accepted,
            sortable: true,
            cell: (row) =>
                row.accepted ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Accepted
                    </span>
                ) : (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Pending
                    </span>
                ),
        },
        {
            name: "Created At",
            selector: (row) => row.created_at,
            sortable: true,
            cell: (row) => (
                <div className="flex items-center text-xs text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span>{row.created_at || "-"}</span>
                </div>
            ),
            minWidth: "160px",
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-2">
                    {!row.accepted && (
                        <button
                            onClick={() =>
                                router.put(
                                    route("tutionRequests.update", row.id),
                                    {
                                        accepted: true,
                                    }
                                )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Accept
                        </button>
                    )}
                    <button
                        onClick={() =>
                            router.visit(route("chat.show", row.tutee.id))
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        Chat
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            style: { overflow: "visible" },
            allowOverflow: true,
            button: true,
            width: "180px",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Tution Requests" />
            <div className="py-10 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header section */}
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold text-blue-800 mb-1 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 mr-3 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                Tution Requests
                            </h1>
                            <p className="text-blue-600 text-sm font-medium">
                                Manage and respond to student tution requests
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <div className="bg-white shadow-sm rounded-lg px-4 py-2 flex items-center border border-blue-100">
                                <div className="mr-3 bg-blue-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blue-700"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium">
                                        Total Requests
                                    </div>
                                    <div className="font-semibold text-lg text-blue-800">
                                        {requests.length}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-sm rounded-lg px-4 py-2 flex items-center border border-blue-100">
                                <div className="mr-3 bg-green-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-green-700"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium">
                                        Accepted
                                    </div>
                                    <div className="font-semibold text-lg text-green-800">
                                        {
                                            requests.filter((r) => r.accepted)
                                                .length
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-sm rounded-lg px-4 py-2 flex items-center border border-blue-100">
                                <div className="mr-3 bg-amber-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-amber-700"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium">
                                        Pending
                                    </div>
                                    <div className="font-semibold text-lg text-amber-800">
                                        {
                                            requests.filter((r) => !r.accepted)
                                                .length
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main table section */}
                    <div className="bg-white/90 p-8 shadow-xl rounded-2xl border border-blue-100 relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>

                        <DataTable
                            columns={columns}
                            data={requests}
                            pagination
                            customStyles={customStyles}
                            highlightOnHover
                            striped
                            noDataComponent={
                                <div className="text-gray-400 py-12 flex flex-col items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 text-blue-100 mb-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    <p className="text-lg font-medium">
                                        No tution requests found
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Requests from students will appear here
                                    </p>
                                </div>
                            }
                            paginationPerPage={7}
                            paginationRowsPerPageOptions={[7, 10, 15, 20]}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
