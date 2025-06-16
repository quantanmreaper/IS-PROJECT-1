import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import DataTable from "react-data-table-component";

export default function TutionRequestsIndex({ requests }) {
    const handleAccept = (id) => {
        router.post(route("tutionRequests.accept", id));
    };

    const columns = [
        {
            name: "Unit",
            selector: (row) => row.unit?.name ?? "-",
            sortable: true,
        },
        {
            name: "Duration (hrs)",
            selector: (row) => row.duration,
            sortable: true,
        },
        {
            name: "Start",
            selector: (row) => row.scheduled_start,
            sortable: true,
        },
        {
            name: "Stop",
            selector: (row) => row.scheduled_stop,
            sortable: true,
        },
        {
            name: "Acceptance Status",
            cell: (row) =>
                row.accepted ? (
                    <span className="text-green-600 font-semibold">
                        Accepted
                    </span>
                ) : (
                    <span className="text-yellow-600 font-semibold">
                        Pending
                    </span>
                ),
            sortable: true,
        },
        {
            name: "",
            cell: (row) =>
                !row.accepted && (
                    <button
                        onClick={() =>
                            router.put(route("tutionRequests.update", row.id), {
                                accepted: true,
                            })
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow"
                    >
                        Accept
                    </button>
                ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "",
            cell: (row) => (
                <button
                    onClick={() => handleAccept(row.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow"
                >
                    Chat
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Tution Requests" />
            <div className="py-10 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                        <h1 className="text-2xl font-extrabold text-blue-700 mb-6">
                            Tution Requests
                        </h1>
                        <DataTable
                            columns={columns}
                            data={requests}
                            pagination
                            highlightOnHover
                            striped
                            noDataComponent={
                                <div className="text-gray-400 py-8">
                                    No tution requests found.
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
