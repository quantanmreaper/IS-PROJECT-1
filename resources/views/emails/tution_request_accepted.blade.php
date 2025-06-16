<html>

<body>
    <h2>Your Tutoring Session Has Been Accepted!</h2>
    <p>Hello {{ $tutee->name }},</p>
    <p>Your tutoring session request has been <strong>accepted</strong> by {{ $tutor->name }}.</p>
    <ul>
        <li><strong>Unit:</strong> {{ $session->unit->name ?? '-' }}</li>
        <li><strong>Date & Time:</strong> {{ $session->scheduled_start }}</li>
        <li><strong>Duration:</strong> {{ $session->duration ?? 'N/A' }} hour(s)</li>
    </ul>
    <p>Please remember to be on time for your session!</p>
    <p>
        <a href="{{ url('/dashboard') }}"
            style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">Go
            to Dashboard</a>
    </p>
    <p>Thank you for using our platform.</p>
</body>

</html>
