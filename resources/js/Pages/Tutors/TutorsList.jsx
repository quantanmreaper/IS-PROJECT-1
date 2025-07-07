import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function TutorsList({ tutors }) {
    // Ensure tutors is always an array
    const tutorsList = Array.isArray(tutors) ? tutors : [];

    // Collect all unique units from tutors for the filter dropdown
    const allUnits = Array.from(
        new Set(
            tutorsList
                .flatMap((tutor) =>
                    Array.isArray(tutor.units)
                        ? tutor.units.map((u) => u.name)
                        : []
                )
                .filter(Boolean)
        )
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTutors, setFilteredTutors] = useState(tutorsList);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUnit, setSelectedUnit] = useState("all");

    // Filter and sort tutors when search term or sort options change
    useEffect(() => {
        let result = [...tutorsList];

        // Apply search filter
        if (searchTerm) {
            result = result.filter((tutor) =>
                tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply unit filter
        if (selectedUnit !== "all") {
            result = result.filter(
                (tutor) =>
                    Array.isArray(tutor.units) &&
                    tutor.units.some((u) => u.name === selectedUnit)
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            if (sortBy === "name") {
                return sortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortBy === "rate") {
                const rateA = a.hourly_rate || 0;
                const rateB = b.hourly_rate || 0;
                return sortOrder === "asc" ? rateA - rateB : rateB - rateA;
            }
            return 0;
        });

        setFilteredTutors(result);
    }, [tutorsList, searchTerm, sortBy, sortOrder, selectedUnit]);

    // Simulate loading and log tutor data for debugging
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);

            // Debug log to check tutor data
            console.log("All tutors:", tutorsList);
            console.log("Tutors count:", tutorsList.length);
            console.log("Filtered tutors:", filteredTutors);
            console.log("Filtered tutors count:", filteredTutors.length);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Handler for sort option changes
    const handleSortChange = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tutors List" />

            <div className="py-6 md:py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-xl overflow-hidden mb-8 relative">
                        <div className="px-4 sm:px-8 py-8 sm:py-12 max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                                Find Your Perfect Tutor
                            </h1>
                            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-blue-100">
                                Connect with experienced tutors to help you
                                excel in your academic journey
                            </p>
                            <div className="mt-6 sm:mt-8 bg-white rounded-lg p-2 flex flex-col sm:flex-row items-center shadow-lg">
                                <input
                                    type="text"
                                    placeholder="Search tutors by name..."
                                    className="w-full sm:flex-1 border-0 focus:ring-0 px-4 py-3 text-gray-700 placeholder-gray-400 rounded-lg mb-2 sm:mb-0"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <button
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-200 sm:ml-2 flex items-center justify-center"
                                    onClick={() => {
                                        /* Search handling already done via useEffect */
                                    }}
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 lg:block hidden">
                            <div className="h-full bg-opacity-50 flex items-center justify-center">
                                <svg
                                    className="w-64 h-64 text-white opacity-10"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Filter and Sort Options */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            {/* Unit Filter */}
                            <div>
                                <label
                                    htmlFor="unit-filter"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Filter by Unit:
                                </label>
                                <select
                                    id="unit-filter"
                                    value={selectedUnit}
                                    onChange={(e) =>
                                        setSelectedUnit(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Units</option>
                                    {allUnits.map((unit) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Options */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Sort by:
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleSortChange("name")}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                                            sortBy === "name"
                                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        Name
                                        {sortBy === "name" && (
                                            <span className="ml-1">
                                                {sortOrder === "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleSortChange("rate")}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                                            sortBy === "rate"
                                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        Hourly Rate
                                        {sortBy === "rate" && (
                                            <span className="ml-1">
                                                {sortOrder === "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Count and Divider */}
                    <div className="flex items-center mb-6">
                        <div className="px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700 font-medium">
                            {filteredTutors.length}{" "}
                            {filteredTutors.length === 1 ? "tutor" : "tutors"}{" "}
                            available
                        </div>
                        <div className="ml-4 h-px bg-gray-200 flex-grow"></div>
                    </div>

                    {/* Tutors Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100 animate-pulse"
                                >
                                    <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-300 mr-3"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-blue-300 rounded w-2/3 mb-1"></div>
                                            <div className="h-3 bg-blue-300 rounded w-1/3"></div>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-5 bg-blue-50 p-4 rounded-lg">
                                            <div className="h-4 bg-blue-100 rounded w-1/3 mb-3"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {[1, 2, 3].map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`h-6 w-${
                                                            16 + index * 4
                                                        } bg-blue-${
                                                            100 + index * 50
                                                        } rounded-full`}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="h-10 bg-green-50 rounded-lg"></div>
                                        </div>
                                        <div className="mt-auto pt-4">
                                            <div className="h-10 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredTutors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredTutors.map((tutor) => (
                                <div
                                    key={tutor.id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg flex flex-col h-full border border-gray-100 hover:border-blue-300"
                                >
                                    {/* Card Header with blue gradient background and Avatar */}
                                    <div className="relative p-3 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center">
                                        <div className="relative mr-3">
                                            <img
                                                src={
                                                    tutor.pfp
                                                        ? `/storage/${tutor.pfp}`
                                                        : "/defaultpfp.png"
                                                }
                                                alt={tutor.name}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-base text-white">
                                                {tutor.name}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex-1 flex flex-col bg-white">
                                        {/* Units Taught Section */}
                                        <div className="mb-5 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <h3 className="font-medium text-blue-800 mb-3 flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2 text-blue-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                    />
                                                </svg>
                                                Units Taught
                                            </h3>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                {Array.isArray(tutor.units) &&
                                                tutor.units.length > 0 ? (
                                                    <>
                                                        {tutor.units
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    unit,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            unit.id ||
                                                                            index
                                                                        }
                                                                        className="px-3 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200"
                                                                    >
                                                                        {
                                                                            unit.name
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        {tutor.units.length >
                                                            3 && (
                                                            <span className="text-xs text-blue-600 ml-2">
                                                                +{" "}
                                                                {tutor.units
                                                                    .length -
                                                                    3}{" "}
                                                                more
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-gray-500 text-xs">
                                                        No units 
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Hourly Rate Section */}
                                        <div className="mb-4">
                                            <div className="flex items-center  rounded-lg p-3 border border-green-100">
                                                <div>
                                                    <span className="text-xs text-green-600">
                                                        Hourly Rate
                                                    </span>
                                                    <div className="font-bold text-green-600">
                                                        {tutor.hourly_rate
                                                            ? `KSh ${tutor.hourly_rate}/hr`
                                                            : "Rate not specified"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <div className="mt-auto pt-4">
                                            <a
                                                href={route(
                                                    "getTutored.show",
                                                    tutor.id
                                                )}
                                                className="group block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-center font-medium rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm"
                                            >
                                                <span>View Details</span>
                                                <svg
                                                    className="h-4 w-4 ml-2 transform transition-transform duration-200 group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="bg-blue-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                                <svg
                                    className="h-10 w-10 text-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-5 text-xl font-semibold text-gray-800">
                                No tutors found
                            </h3>
                            <p className="mt-2 text-gray-500 max-w-md mx-auto">
                                We couldn't find any tutors matching your search
                                criteria. Try adjusting your search terms.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSortBy("name");
                                    setSortOrder("asc");
                                    setSelectedUnit("all");
                                }}
                                className="mt-6 inline-flex items-center px-6 py-2 bg-white border border-blue-400 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200"
                            >
                                <svg
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
