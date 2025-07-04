import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import React, { useState, useEffect } from "react";
import { formatInTimeZone } from 'date-fns-tz';
import { toNairobiTime, nairobiDateToUtcIso } from '@/utils/nairobiTime';

export default function TutorBookingCreate({
    tutor,
    units,
    unavailableTimes = [],
    availability = {},
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        unit_id: "",
        session_datetime: "",
        duration: "1",
        notes: "",
    });
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState("");
    
    // Format times for HTML datetime-local input
    const formatForDatetimeLocal = (dateTimeString) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toISOString().slice(0, 16);
    };
    
    // Generate min and max datetime values
    const [minDateTime, setMinDateTime] = useState('');
    const [maxDateTime, setMaxDateTime] = useState('');
    
    // Calculate available time slots based on tutor availability
    useEffect(() => {
        // Default to now for minimum time
        let minTime = new Date();
        // Default to 14 days from now for maximum time
        let maxTime = new Date();
        maxTime.setDate(maxTime.getDate() + 14);
        
        // If tutor has availability settings, use those instead
        if (availability && availability.start) {
            // Parse daily start time (format: "HH:MM:SS")
            const [startHours, startMinutes] = availability.start.split(':');
            const today = new Date();
            today.setHours(parseInt(startHours, 10), parseInt(startMinutes, 10), 0);
            
            // If today's start time is already past, set to tomorrow
            if (today < minTime) {
                today.setDate(today.getDate() + 1);
            }
            
            minTime = today;
        }
        
        if (availability && availability.stop) {
            // For max time, we need to calculate the last possible day within 14 days
            // that ends before the tutor's availability stop time
            const [stopHours, stopMinutes] = availability.stop.split(':');
            maxTime.setHours(parseInt(stopHours, 10), parseInt(stopMinutes, 10), 0);
        }
        
        setMinDateTime(formatForDatetimeLocal(minTime));
        setMaxDateTime(formatForDatetimeLocal(maxTime));
    }, [availability]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleDateChange = (e) => {
        const selectedDateTime = new Date(e.target.value);
        setDateError("");
        
        // Check if the selected time is within the tutor's daily availability window
        if (availability.start && availability.stop) {
            const [startHours, startMinutes] = availability.start.split(':');
            const [stopHours, stopMinutes] = availability.stop.split(':');
            
            const selectedHours = selectedDateTime.getHours();
            const selectedMinutes = selectedDateTime.getMinutes();
            
            // Create Date objects for today with the tutor's start and stop times
            const availabilityStart = new Date(selectedDateTime);
            availabilityStart.setHours(parseInt(startHours, 10), parseInt(startMinutes, 10), 0);
            
            const availabilityStop = new Date(selectedDateTime);
            availabilityStop.setHours(parseInt(stopHours, 10), parseInt(stopMinutes, 10), 0);
            
            // Check if selected time is outside availability window
            if (selectedDateTime < availabilityStart || selectedDateTime > availabilityStop) {
                setDateError(`This tutor is only available between ${availability.start} and ${availability.stop}`);
                return;
            }
        }
        
        // Check if the selected time overlaps with any booked sessions
        const sessionDuration = parseInt(data.duration, 10);
        const sessionEnd = new Date(selectedDateTime);
        sessionEnd.setHours(sessionEnd.getHours() + sessionDuration);
        
        const hasConflict = unavailableTimes.some(timeSlot => {
            const bookedStart = new Date(timeSlot.start);
            const bookedEnd = new Date(timeSlot.stop);
            
            // Check if there's any overlap between the proposed session and existing sessions
            return (
                (selectedDateTime >= bookedStart && selectedDateTime < bookedEnd) || 
                (sessionEnd > bookedStart && sessionEnd <= bookedEnd) ||
                (selectedDateTime <= bookedStart && sessionEnd >= bookedEnd)
            );
        });
        
        if (hasConflict) {
            setDateError("This time slot conflicts with an existing booking. Please choose another time.");
            return;
        }
        
        setData("session_datetime", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (dateError) {
            return; // Don't submit if there are date errors
        }
        
        // Validate required fields
        if (!data.unit_id || !data.session_datetime) {
            if (!data.unit_id) setData('errors', { ...errors, unit_id: 'Please select a unit' });
            if (!data.session_datetime) setData('errors', { ...errors, session_datetime: 'Please select a date and time' });
            return;
        }
        
        setLoading(true);
        
        // Use Inertia router.post directly
        router.post(
            route("bookTutor.store", tutor.id), 
            data, 
            {
                preserveScroll: true,
                onError: (errors) => {
                    setLoading(false);
                    console.error("Form submission errors:", errors);
                },
                onSuccess: () => {
                    // This will run when the form is successfully submitted and the redirect happens
                    console.log("Form submitted successfully!");
                },
                onFinish: () => {
                    // This runs whether the form is successful or not
                    console.log("Form submission completed");
                    // We don't set loading to false here because we want to keep the overlay
                    // during redirect to payment page
                }
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.477V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.523a12.083 12.083 0 012.84-2.899L12 14z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 drop-shadow tracking-tight">
                        Book a Session with {tutor.name}
                    </h2>
                </div>
            }
        >
            <Head title="Book Tutor Session" />
            <div className="pt-6 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                    <div className="bg-white/90 p-8 shadow-2xl rounded-3xl border border-blue-100 relative overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
                                <svg
                                    className="animate-spin h-10 w-10 text-blue-600 mb-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                                <span className="text-blue-700 font-semibold text-lg">
                                    Redirecting to payment...
                                </span>
                            </div>
                        )}
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-extrabold text-blue-700 mb-2 drop-shadow">
                                Book a Tutoring Session
                            </h1>
                            <p className="text-gray-600">
                                Select a unit and date/time to book your session
                                with this tutor.
                            </p>
                            {availability && availability.start && availability.stop && (
                                <p className="text-blue-600 mt-2 font-medium">
                                    Tutor is available daily between {availability.start} and {availability.stop}
                                </p>
                            )}
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 z-10 relative"
                        >
                            {/* Unit Select */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Unit
                                </label>
                                <select
                                    name="unit_id"
                                    value={data.unit_id}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                >
                                    <option value="">Select a unit</option>
                                    {units.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.unit_id && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.unit_id}
                                    </div>
                                )}
                            </div>
                            {/* DateTime */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Session Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="session_datetime"
                                    value={data.session_datetime}
                                    onChange={handleDateChange}
                                    min={minDateTime}
                                    max={maxDateTime}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                />
                                {dateError && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {dateError}
                                    </div>
                                )}
                                <div className="text-xs text-gray-500 mt-1">
                                    All times are in Africa/Nairobi. Please
                                    select an available slot.
                                </div>
                                {errors.session_datetime && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.session_datetime}
                                    </div>
                                )}
                            </div>
                            {/* Duration */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Duration (hours)
                                </label>
                                <select
                                    name="duration"
                                    value={data.duration}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
                                    required
                                >
                                    {[1, 2, 3, 4, 5].map((hour) => (
                                        <option key={hour} value={hour}>
                                            {hour} hour{hour > 1 ? "s" : ""}
                                        </option>
                                    ))}
                                </select>
                                {errors.duration && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.duration}
                                    </div>
                                )}
                            </div>
                            {/* Notes */}
                            <div>
                                <label className="block mb-1 font-semibold text-blue-700">
                                    Notes (optional)
                                </label>
                                <textarea
                                    name="notes"
                                    value={data.notes}
                                    onChange={handleChange}
                                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white min-h-[80px]"
                                    placeholder="Add any notes for the tutor..."
                                />
                                {errors.notes && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.notes}
                                    </div>
                                )}
                            </div>
                            {/* Debug output */}
                            {Object.keys(errors).length > 0 && (
                                <div className="text-red-600 p-2 bg-red-50 rounded-lg">
                                    <p className="font-semibold">Please fix these errors:</p>
                                    <ul className="list-disc list-inside text-sm">
                                        {Object.entries(errors).map(([key, value]) => (
                                            <li key={key}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing || dateError !== ""}
                                className={`w-full bg-gradient-to-r ${
                                    dateError ? "from-gray-400 to-gray-500" : "from-blue-500 to-blue-700 hover:from-blue-800 hover:to-blue-900"
                                } text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 mt-4`}
                            >
                                Book Session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
