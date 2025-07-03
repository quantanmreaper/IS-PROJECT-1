import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

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

    const columns = [
        {
            name: "#",
            selector: (row, idx) => (page - 1) * 10 + idx + 1,
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
                    <a
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
                    </a>
                </div>
            }
        >
            <Head title="Units List" />
            <div className="py-12 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-xl rounded-2xl border border-blue-100">
                        <DataTable
                            columns={columns}
                            data={units}
                            pagination
                            highlightOnHover
                            striped
                            noDataComponent={
                                <div className="text-gray-500 py-8">
                                    No units found.
                                </div>
                            }
                        />
                        {/* Pagination Controls (optional, if you want to keep custom pagination) */}
                        {/* ...existing code for pagination if needed... */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
