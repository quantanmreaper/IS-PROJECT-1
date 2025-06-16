<html>

<body>
    <h2>New Tutoring Session Booking</h2>
    <p>Hello {{ $tutor->name }},</p>
    <p>You have a new booking from {{ $tutee->name }}.</p>
    <ul>
        <li><strong>Unit:</strong> {{ $session->unit->name }}</li>
        <li><strong>Date & Time:</strong> {{ $session->scheduled_start }}</li>
        <li><strong>Duration:</strong> {{ $session->duration ?? 'N/A' }} hour(s)</li>
        <li><strong>Notes:</strong> {{ $session->notes ?? 'None' }}</li>
    </ul>
    <p>Please log in to your dashboard for more details.</p>
    <p>
        <a href="{{ url('/tutionRequests') }}"
            style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">
            Go to Dashboard
        </a>
    </p>
</body>

</html>
