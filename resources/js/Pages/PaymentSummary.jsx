import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import toastr from 'toastr';

export default function PaymentSummary({ auth, payment }) {
    const [processing, setProcessing] = useState(false);

    const handleConfirm = () => {
        setProcessing(true);
        router.post(payment.confirm_url, {}, {
            onSuccess: (page) => {
                // If backend returns a redirect URL, handle it
                if (page.props && page.props.redirect) {
                    toastr.info('Redirecting to payment...');
                    window.location.href = page.props.redirect;
                }
            },
            onError: (errors) => {
                toastr.error('Failed to initiate payment.');
            },
            onFinish: () => setProcessing(false),
            preserveScroll: true,
            preserveState: true,
            only: [],
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Payment Summary" />
            <div className="py-10 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Confirm Your Payment</h2>
                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full mr-3">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-gray-900">{payment.item_title}</div>
                                <div className="text-sm text-gray-500">{payment.item_type === 'course' ? 'Course' : 'Tutoring Session'}</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Instructor/Tutor:</span>
                            <span className="font-medium text-gray-800">{payment.instructor_name}</span>
                        </div>
                        {payment.session_datetime && (
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Session Date:</span>
                                <span className="font-medium text-gray-800">{payment.session_datetime}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-bold text-blue-700 text-lg">KSh {payment.amount}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Reference:</span>
                            <span className="text-xs text-gray-500">{payment.ref}</span>
                        </div>
                    </div>
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-60"
                        onClick={handleConfirm}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>Confirm &amp; Pay</>
                        )}
                    </button>
                    <button
                        className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-all duration-200"
                        onClick={() => router.visit(payment.cancel_url)}
                        disabled={processing}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
