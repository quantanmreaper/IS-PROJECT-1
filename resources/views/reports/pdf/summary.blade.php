<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Summary Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.4;
        }
        .header {
            padding: 10px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            text-align: center;
        }
        .header h1 {
            color: #2563eb;
            margin: 0;
            font-size: 24px;
        }
        .meta {
            margin-bottom: 20px;
            font-size: 14px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            color: #2563eb;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 12px;
        }
        th {
            background-color: #f8fafc;
            color: #2563eb;
            font-weight: bold;
            text-align: left;
        }
        tr:nth-child(even) {
            background-color: #f9fafb;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .stats {
            display: table;
            width: 100%;
            margin-top: 10px;
        }
        .stat-item {
            display: table-row;
        }
        .stat-label, .stat-value {
            display: table-cell;
            padding: 5px;
            border-bottom: 1px solid #eee;
        }
        .stat-label {
            font-weight: bold;
            width: 60%;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Platform Summary Report</h1>
    </div>
    
    <div class="meta">
        <p><strong>Date Range:</strong> {{ $startDate->format('Y-m-d') }} to {{ $endDate->format('Y-m-d') }}</p>
        <p><strong>Generated:</strong> {{ now()->format('Y-m-d H:i:s') }}</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">Key Metrics</h2>
        <div class="stats">
            <div class="stat-item">
                <div class="stat-label">Total Users:</div>
                <div class="stat-value">{{ $reportData['total_users'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Courses:</div>
                <div class="stat-value">{{ $reportData['total_courses'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Sessions:</div>
                <div class="stat-value">{{ $reportData['total_sessions'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">New Users (This Period):</div>
                <div class="stat-value">{{ $reportData['new_users'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">New Courses (This Period):</div>
                <div class="stat-value">{{ $reportData['new_courses'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">New Sessions (This Period):</div>
                <div class="stat-value">{{ $reportData['new_sessions'] }}</div>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">User Type Distribution</h2>
        <table>
            <thead>
                <tr>
                    <th>User Type</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reportData['user_types'] as $type => $count)
                    <tr>
                        <td>{{ $type }}</td>
                        <td>{{ $count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h2 class="section-title">Course Status Distribution</h2>
        <table>
            <thead>
                <tr>
                    <th>Course Status</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reportData['course_statuses'] as $status => $count)
                    <tr>
                        <td>{{ $status }}</td>
                        <td>{{ $count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h2 class="section-title">Session Status Distribution</h2>
        <table>
            <thead>
                <tr>
                    <th>Session Status</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reportData['session_statuses'] as $status => $count)
                    <tr>
                        <td>{{ $status }}</td>
                        <td>{{ $count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    
    <div class="footer">
        <p>This report is confidential and intended for authorized personnel only.</p>
        <p>© {{ date('Y') }} Peer To Peer Mentoring and Tutoring System. All rights reserved.</p>
    </div>
</body>
</html> 