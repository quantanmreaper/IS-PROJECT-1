import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function UnitsAddition({
    units: initialUnits,
    links,
    currentPage,
    lastPage,
}) {
    const [units, setUnits] = useState(initialUnits || []);
    const [page, setPage] = useState(currentPage || 1);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
    });

    // Fetch units for a given page
    const fetchUnits = (pageNum) => {
        window.axios
            .get(route("Units.index", { page: pageNum }))
            .then((res) => {
                setUnits(res.data.units.data);
                setPage(res.data.units.current_page);
            });
    };

    const handlePageChange = (newPage) => {
        fetchUnits(newPage);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("UnitsAddition"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Units List
                    </h2>
                    <a
                        href={route("units.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 transition ease-in-out duration-150 shadow-md"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add New Unit
                    </a>
                </div>
            }
        >
            <Head title="Units List" />
            <div className="py-12 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-xl rounded-2xl border border-blue-100">
                        <table className="min-w-full divide-y divide-blue-200 rounded-lg overflow-hidden">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                                        Unit Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-blue-100">
                                {units && units.length > 0 ? (
                                    units.map((unit, idx) => (
                                        <tr
                                            key={unit.id}
                                            className="hover:bg-blue-50 transition"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                                {(page - 1) * 10 + idx + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-blue-800 font-semibold">
                                                {unit.name}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-gray-600 max-w-xs overflow-hidden text-ellipsis"
                                                style={{ maxWidth: "250px" }}
                                            >
                                                {unit.description &&
                                                unit.description.length > 60
                                                    ? unit.description.slice(
                                                          0,
                                                          60
                                                      ) + "..."
                                                    : unit.description}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            No units found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from(
                                { length: lastPage },
                                (_, i) => i + 1
                            ).map((pg) => (
                                <button
                                    key={pg}
                                    onClick={() => handlePageChange(pg)}
                                    className={`px-3 py-1 rounded-lg font-semibold border transition-all duration-150 ${
                                        pg === page
                                            ? "bg-blue-600 text-white border-blue-600 shadow"
                                            : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                                    }`}
                                >
                                    {pg}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
