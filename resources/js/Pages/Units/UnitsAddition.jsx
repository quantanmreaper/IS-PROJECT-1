import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";

export default function UnitsAddition() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("units.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Unit
                </h2>
            }
        >
            <Head title="Add Unit" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Unit Name with Book Icon */}
                            <div>
                                <InputLabel htmlFor="name" value="Unit Name" />
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        {/* Book Icon */}
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 6v13a1 1 0 001 1h14a1 1 0 001-1V6"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 3v4a1 1 0 01-1 1H9a1 1 0 01-1-1V3"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 3h8"
                                            />
                                        </svg>
                                    </span>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="pl-10 mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            {/* Description with Document Icon */}
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                        {/* Document Icon */}
                                        <svg
                                            className="w-5 h-5 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 16h8M8 12h8m-8-4h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </span>
                                    <TextInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="pl-10 mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex justify-end">
                                <PrimaryButton
                                    className="bg-green-600 hover:bg-green-800 focus:bg-green-700 active:bg-green-800 focus:ring-green-500"
                                    disabled={processing}
                                >
                                    Add Unit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
