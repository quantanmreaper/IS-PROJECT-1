import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { user } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900">
                             Welcome! {user.name} 
                        </div>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}