import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DataTable from "react-data-table-component";

function formatDateTime(dt) {
    if (!dt) return "-";
    const d = new Date(dt);
    return d.toLocaleString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export default function TutorBookings({
    auth,
    bookings,
    totalRevenue,
    availableFunds,
}) {
    const columns = [
        {
            name: "Tutee",
            selector: (row) => row.tutee_name,
            sortable: true,
            cell: (row) => (
                <div className="font-medium text-blue-700">
                    {row.tutee_name}
                </div>
            ),
        },
        {
            name: "Unit",
            selector: (row) => row.unit_name,
            sortable: true,
            cell: (row) => (
                <div className="font-medium text-gray-800">{row.unit_name}</div>
            ),
        },
        {
            name: "Start",
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
                    {formatDateTime(row.scheduled_start)}
                </div>
            ),
        },
        {
            name: "Stop",
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    {formatDateTime(row.scheduled_stop)}
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
            name: "Amount",
            selector: (row) => row.amount,
            sortable: true,
            cell: (row) => (
                <div className="font-bold text-green-700">KSh {row.amount}</div>
            ),
        },
        {
            name: "Created At",
            selector: (row) => row.created_at,
            sortable: true,
            cell: (row) => <span>{formatDateTime(row.created_at)}</span>,
        },
    ];

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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Bookings" />
            <div className="max-w-5xl mx-auto py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Accepted Bookings</h1>
                    <div className="flex gap-6">
                        <div className="bg-blue-100 rounded-lg px-6 py-3 text-center">
                            <div className="text-xs text-gray-500">
                                Total Booking Revenue
                            </div>
                            <div className="text-2xl font-bold text-blue-700">
                                KSh {totalRevenue.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-green-100 rounded-lg px-6 py-3 text-center">
                            <div className="text-xs text-gray-500">
                                Available Funds
                            </div>
                            <div className="text-2xl font-bold text-green-700">
                                KSh {availableFunds.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow rounded-xl overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={bookings}
                        customStyles={customStyles}
                        highlightOnHover
                        pagination
                        noDataComponent={
                            <div className="text-center py-8 text-gray-400">
                                No bookings found.
                            </div>
                        }
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
