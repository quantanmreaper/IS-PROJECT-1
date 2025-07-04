import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Index({
    units,
    currentPage,
    lastPage,
    flash
}) {
    const [page, setPage] = useState(currentPage || 1);
    const [successMessage, setSuccessMessage] = useState(flash?.success || null);
    const [errorMessage, setErrorMessage] = useState(flash?.error || null);

    // Clear messages after 5 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handlePageChange = (newPage) => {
        window.location.href = route('units.index', { page: newPage });
    };

    const columns = [
        {
            name: "#",
            selector: (row, idx) => ((page - 1) * 10) + idx + 1,
            width: "60px",
        },
        {
            name: "Unit Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) =>
                row.description?.length > 60
                    ? row.description.slice(0, 60) + "..."
                    : row.description,
            sortable: false,
            wrap: true,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Units List
                    </h2>
                    <Link
                        href={route("UnitsAddition")}
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
                    </Link>
                </div>
            }
        >
            <Head title="Units List" />
            <div className="py-12 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow">
                            <div className="flex items-center">
                                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <p>{successMessage}</p>
                            </div>
                        </div>
                    )}
                    
                    {errorMessage && (
                        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow">
                            <div className="flex items-center">
                                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2 2l2 2" />
                                </svg>
                                <p>{errorMessage}</p>
                            </div>
                        </div>
                    )}
                    
                    <div className="bg-white/90 p-8 shadow-xl rounded-2xl border border-blue-100">
                        <DataTable
                            columns={columns}
                            data={units.data || []}
                            pagination
                            paginationServer
                            paginationTotalRows={units.total}
                            paginationPerPage={units.per_page}
                            paginationDefaultPage={currentPage}
                            onChangePage={handlePageChange}
                            highlightOnHover
                            striped
                            noDataComponent={
                                <div className="text-gray-500 py-8">
                                    No units found.
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
