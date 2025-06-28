<html>
<head>
    <meta charset="UTF-8">
    <title>New Tutoring Session Booking</title>
</head>
<body style="margin:0;padding:0;background:#f4f8fb;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8fb;padding:0;margin:0;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:40px auto;background:#fff;border-radius:18px;box-shadow:0 4px 24px rgba(37,99,235,0.08);overflow:hidden;">
                    <tr>
                        <td style="padding:32px 32px 16px 32px;text-align:center;background:linear-gradient(90deg,#2563eb 0%,#60a5fa 100%);">
                            <img src="https://cdn-icons-png.flaticon.com/512/190/190406.png" alt="Booking" width="64" height="64" style="margin-bottom:12px;border-radius:50%;background:#fff;padding:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                            <h2 style="color:#fff;font-size:2rem;font-weight:800;margin:0 0 8px 0;font-family:sans-serif;letter-spacing:-1px;">
                                New Tutoring Booking!
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px 32px 8px 32px;">
                            <p style="font-size:1.1rem;color:#2563eb;font-weight:600;margin:0 0 8px 0;font-family:sans-serif;">
                                Hello {{ $tutor->name }},
                            </p>
                            <p style="font-size:1rem;color:#334155;margin:0 0 18px 0;font-family:sans-serif;">
                                You have a new booking from <span style="color:#2563eb;font-weight:700;">{{ $tutee->name }}</span>.
                            </p>
                            <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 18px 0;">
                                <tr>
                                    <td style="padding:8px 0;font-size:1rem;color:#64748b;font-family:sans-serif;">
                                        <strong style="color:#2563eb;">Unit:</strong>
                                    </td>
                                    <td style="padding:8px 0;font-size:1rem;color:#334155;font-family:sans-serif;">
                                        {{ $session->unit->name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;font-size:1rem;color:#64748b;font-family:sans-serif;">
                                        <strong style="color:#2563eb;">Date &amp; Time:</strong>
                                    </td>
                                    <td style="padding:8px 0;font-size:1rem;color:#334155;font-family:sans-serif;">
                                        {{ $session->scheduled_start }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;font-size:1rem;color:#64748b;font-family:sans-serif;">
                                        <strong style="color:#2563eb;">Duration:</strong>
                                    </td>
                                    <td style="padding:8px 0;font-size:1rem;color:#334155;font-family:sans-serif;">
                                        {{ $session->duration ?? 'N/A' }} hour(s)
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;font-size:1rem;color:#64748b;font-family:sans-serif;">
                                        <strong style="color:#2563eb;">Notes:</strong>
                                    </td>
                                    <td style="padding:8px 0;font-size:1rem;color:#334155;font-family:sans-serif;">
                                        {{ $session->notes ?? 'None' }}
                                    </td>
                                </tr>
                            </table>
                            <div style="text-align:center;margin:32px 0 16px 0;">
                                <a href="{{ url('/tutionRequests') }}"
                                   style="display:inline-block;padding:14px 36px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:1.1rem;box-shadow:0 2px 8px rgba(37,99,235,0.10);transition:background 0.2s;">
                                    Go to Dashboard
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 32px 24px 32px;">
                            <p style="font-size:0.95rem;color:#64748b;text-align:center;margin:0;font-family:sans-serif;">
                                Thank you for being a valued tutor.<br>
                                <span style="color:#2563eb;font-weight:600;">Strathmore Tution Platform</span>
                            </p>
                        </td>
                    </tr>
                </table>
                <div style="margin:24px 0 0 0;text-align:center;color:#b6c3d1;font-size:0.9rem;font-family:sans-serif;">
                    &copy; {{ date('Y') }} Strathmore Tution Platform
                </div>
            </td>
        </tr>
    </table>
</body>
</html>