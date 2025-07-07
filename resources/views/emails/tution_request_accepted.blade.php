<!-- filepath: resources/views/emails/tution_request_accepted.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Tutoring Session Has Been Accepted</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:20px;margin:0;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.06);overflow:hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding:0;">
                            <div style="height:8px;background:linear-gradient(90deg,#0369a1 0%,#38bdf8 100%);"></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px 40px 24px;text-align:center;">
                            <img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png" alt="Accepted" width="72" height="72" style="margin-bottom:16px;">
                            <h1 style="color:#1e293b;font-size:24px;font-weight:700;margin:0;line-height:1.2;">
                                Tutoring Session Accepted
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding:0 40px 24px;">
                            <p style="font-size:16px;color:#334155;margin:0 0 24px;line-height:1.5;">
                                Hello <span style="font-weight:600;color:#0284c7;">{{ $tutee->name }}</span>,
                            </p>
                            <p style="font-size:16px;color:#334155;margin:0 0 24px;line-height:1.5;">
                                Great news! Your tutoring session request has been <span style="font-weight:600;color:#10b981;">accepted</span> by <span style="font-weight:600;color:#0284c7;">{{ $tutor->name }}</span>.
                            </p>
                            
                            <!-- Session Details Card -->
                            <div style="background:#f8fafc;border-radius:8px;padding:24px;margin-bottom:24px;border-left:4px solid #0284c7;">
                                <table cellpadding="0" cellspacing="0" style="width:100%;">
                                    <tr>
                                        <td style="padding:8px 0;font-size:15px;color:#64748b;">
                                            <strong style="color:#1e293b;">Unit:</strong>
                                        </td>
                                        <td style="padding:8px 0;font-size:15px;color:#1e293b;font-weight:500;">
                                            {{ $session->unit->name ?? '-' }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:8px 0;font-size:15px;color:#64748b;">
                                            <strong style="color:#1e293b;">Date &amp; Time:</strong>
                                        </td>
                                        <td style="padding:8px 0;font-size:15px;color:#1e293b;font-weight:500;">
                                            {{ $session->scheduled_start }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:8px 0;font-size:15px;color:#64748b;">
                                            <strong style="color:#1e293b;">Duration:</strong>
                                        </td>
                                        <td style="padding:8px 0;font-size:15px;color:#1e293b;font-weight:500;">
                                            @php
                                                $start = \Carbon\Carbon::parse($session->scheduled_start);
                                                $stop = \Carbon\Carbon::parse($session->scheduled_stop);
                                                $duration = $start->diffInHours($stop);
                                            @endphp
                                            {{ $duration }} hour(s)
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Reminder Box -->
                            <div style="background:#e0f2fe;border-radius:8px;padding:16px 24px;margin-bottom:24px;border-left:4px solid #0ea5e9;">
                                <p style="font-size:15px;color:#0369a1;font-weight:500;margin:0;line-height:1.5;">
                                    <strong>Reminder:</strong> Please be on time for your session and come prepared with any questions or materials you'd like to discuss.
                                </p>
                            </div>
                            
                            <!-- CTA Button -->
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
                        <td style="padding:24px 40px;background:#f8fafc;text-align:center;border-top:1px solid #e2e8f0;">
                            <p style="font-size:14px;color:#64748b;margin:0 0 8px;line-height:1.5;">
                                Thank you for using our platform.
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