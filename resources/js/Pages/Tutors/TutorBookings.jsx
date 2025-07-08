import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function formatDateTime(dt) {
    if (!dt) return "-";
    const d = new Date(dt);
    return d.toLocaleString();
}

export default function TutorBookings({
    auth,
    bookings,
    totalRevenue,
    availableFunds,
}) {
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
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tutee
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Unit
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Start
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stop
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Duration (hrs)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="text-center py-8 text-gray-400"
                                    >
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((b) => (
                                    <tr key={b.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {b.tutee_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {b.unit_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {b.scheduled_start}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {b.scheduled_stop}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {b.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {b.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            KSh {b.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {formatDateTime(b.created_at)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
