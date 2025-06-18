{{-- Peer Tutoring & Mentorship Notification Email --}}

<table width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="font-family: Arial, sans-serif; background: #f9fafb; padding: 0; margin: 0;">
    <tr>
        <td align="center" style="padding: 32px 0 16px 0;">
            <div style="font-size: 2rem; font-weight: bold; color: #2563eb;">Welcome to Peer Tutoring & Mentorship!</div>
            <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Empowering Students, Together.</div>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding: 24px 0 0 0;">
            <div
                style="background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #e5e7eb; max-width: 480px; margin: auto; padding: 32px 32px 24px 32px;">
                <div style="font-size: 1.1rem; color: #111827; margin-bottom: 16px;">Hi there,</div>
                <div style="font-size: 1rem; color: #374151; margin-bottom: 20px;">
                    Thank you for registering on our platform! To get started, please verify your Strathmore email
                    address
                    by clicking the button below:
                </div>
                <!-- Action Button -->
                <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="margin-bottom: 24px;">
                    <tr>
                        <td align="center">
                            @isset($actionText)
                                <a href="{{ $actionUrl }}"
                                    style="background: #2563eb; color: #fff; padding: 12px 32px; border-radius: 6px; font-size: 1rem; font-weight: bold; text-decoration: none; display: inline-block;">
                                    {{ $actionText }}
                                </a>
                            @endisset
                        </td>
                    </tr>
                </table>
                <table class="panel" width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="background: #f1f5f9; border-radius: 6px; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 16px; color: #374151; font-size: 0.98rem;">
                            <strong>Why verify?</strong> Verifying your email helps us keep your account secure and
                            ensures
                            you receive important updates about your sessions and requests.
                        </td>
                    </tr>
                </table>
                <div style="font-size: 0.97rem; color: #6b7280; margin-bottom: 12px;">
                    If you did not create an account, no further action is required.
                </div>
                @isset($actionUrl)
                    <div style="font-size: 0.97rem; color: #6b7280; margin: 18px 0 8px 0; word-break: break-all;">
                        <strong>Having trouble clicking the button?</strong><br>
                        You can copy and paste this link into your browser:<br>
                        <a href="{{ $actionUrl }}"
                            style="color: #2563eb; text-decoration: underline;">{{ $actionUrl }}</a>
                    </div>
                @endisset
                <div style="font-size: 1rem; color: #374151; margin-bottom: 0;">
                    Thanks,<br>
                    <span style="color: #2563eb; font-weight: bold;">The Peer Tutoring & Mentorship Team</span>
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding: 32px 0 0 0;">
            <div style="text-align:center; color: #6b7280; font-size: 0.95rem; margin-top: 16px;">
                &copy; 2025 Peer Tutoring & Mentorship. All rights reserved.
            </div>
        </td>
    </tr>
</table>
