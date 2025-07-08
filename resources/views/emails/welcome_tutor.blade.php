<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Peer To Peer Tutoring!</title>
</head>

<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:20px;margin:0;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.06);overflow:hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding:0;">
                            <div style="height:8px;background:linear-gradient(90deg,#0369a1 0%,#38bdf8 100%);"></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px 40px 24px;text-align:center;">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Welcome"
                                width="72" height="72" style="margin-bottom:16px;">
                            <h1 style="color:#1e293b;font-size:24px;font-weight:700;margin:0;line-height:1.2;">
                                Welcome, {{ $tutor->name }}!
                            </h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding:0 40px 24px;">
                            <p style="font-size:16px;color:#334155;margin:0 0 24px;line-height:1.5;">
                                Thank you for joining <span style="color:#0284c7;font-weight:600;">Peer To Peer Tutoring
                                    & Mentorship Platform</span> as a tutor.
                            </p>
                            <p style="font-size:16px;color:#334155;margin:0 0 24px;line-height:1.5;">
                                You can now start accepting tutoring requests, manage your sessions, and help students
                                achieve their learning goals.
                            </p>
                            <div
                                style="background:#f8fafc;border-radius:8px;padding:24px;margin-bottom:24px;border-left:4px solid #0284c7;">
                                <p style="font-size:15px;color:#0369a1;font-weight:500;margin:0;line-height:1.5;">
                                    <strong>Next Steps:</strong><br>
                                    - Complete your tutor profile<br>
                                    - Set your availability<br>
                                    - Respond promptly to new requests
                                </p>
                            </div>
                            <div style="text-align:center;margin:32px 0;">
                                <a href="{{ url('/dashboard') }}"
                                    style="display:inline-block;padding:12px 28px;background:#0284c7;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:600;font-size:16px;transition:background 0.2s ease;">
                                    Go to Dashboard
                                </a>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="padding:24px 40px;background:#f8fafc;text-align:center;border-top:1px solid #e2e8f0;">
                            <p style="font-size:14px;color:#64748b;margin:0 0 8px;line-height:1.5;">
                                Welcome aboard! We’re excited to have you as part of our tutor community.
                            </p>
                            <p style="font-size:14px;color:#64748b;margin:0;line-height:1.5;">
                                <strong style="color:#0284c7;">Peer To Peer Tutoring & Mentorship Platform</strong>
                            </p>
                            <p style="font-size:13px;color:#94a3b8;margin:16px 0 0;line-height:1.5;">
                                &copy; {{ date('Y') }} Peer To Peer Tution Platform. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
