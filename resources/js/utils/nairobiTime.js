// Utility for Africa/Nairobi timezone conversion
import * as dateFnsTz from "date-fns-tz";

export const NAIROBI_TZ = "Africa/Nairobi";

// Convert a local (browser) Date to Nairobi time (returns a Date object in Nairobi time)
export function toNairobiTime(date) {
    return dateFnsTz.utcToZonedTime(date, NAIROBI_TZ);
}

// Convert a Nairobi time (as Date) to UTC ISO string
export function nairobiDateToUtcIso(date) {
    return dateFnsTz.zonedTimeToUtc(date, NAIROBI_TZ).toISOString();
}

// Format a Nairobi time for display
export function formatNairobi(date, fmt = "yyyy-MM-dd HH:mm") {
    return dateFnsTz.format(dateFnsTz.utcToZonedTime(date, NAIROBI_TZ), fmt, {
        timeZone: NAIROBI_TZ,
    });
}
