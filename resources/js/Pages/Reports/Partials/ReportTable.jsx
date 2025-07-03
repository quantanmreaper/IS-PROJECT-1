import React, { useState } from 'react';

export default function ReportTable({ data }) {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    
    // Calculate pagination
    const totalPages = Math.ceil(data.data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = data.data.slice(startIndex, endIndex);
    
    // Handle page changes
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtons = 5;
        
        if (totalPages <= maxPageButtons) {
            // Show all page numbers if there are few pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Add first page
            pageNumbers.push(1);
            
            // Calculate range around current page
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);
            
            // Adjust range if at the beginning or end
            if (currentPage <= 2) {
                endPage = Math.min(totalPages - 1, 4);
            } else if (currentPage >= totalPages - 1) {
                startPage = Math.max(2, totalPages - 3);
            }
            
            // Add ellipsis before middle pages if needed
            if (startPage > 2) {
                pageNumbers.push('...');
            }
            
            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            
            // Add ellipsis after middle pages if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            
            // Add last page
            pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

    return (
        <div>
            {/* Report Summary */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">{data.title} Summary</h2>
                <p className="text-gray-700">
                    <span className="font-semibold">Date Range:</span> {data.date_range}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Total Records:</span> {data.total_count}
                </p>
            </div>
            
            {/* Report Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            {data.columns.map((column, index) => (
                                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentData.length > 0 ? (
                            currentData.map((row, rowIndex) => (
                                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    {Object.values(row).map((value, valueIndex) => (
                                        <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={data.columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(endIndex, data.data.length)}</span> of{' '}
                        <span className="font-medium">{data.data.length}</span> results
                    </div>
                    
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                                currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {getPageNumbers().map((pageNumber, index) => (
                            <React.Fragment key={index}>
                                {pageNumber === '...' ? (
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium">
                                        {pageNumber}
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => goToPage(pageNumber)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            pageNumber === currentPage
                                                ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                        
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                                currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
} 