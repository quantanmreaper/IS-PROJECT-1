<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>User Report</title>
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
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
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
        .summary {
            margin-bottom: 20px;
        }
        .summary p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>User Report</h1>
    </div>
    
    <div class="meta">
        <p><strong>Date Range:</strong> {{ $startDate->format('Y-m-d') }} to {{ $endDate->format('Y-m-d') }}</p>
        <p><strong>Generated:</strong> {{ now()->format('Y-m-d H:i:s') }}</p>
    </div>
    
    <div class="summary">
        <p><strong>Total Users:</strong> {{ $reportData['total_count'] }}</p>
    </div>
    
    <table>
        <thead>
            <tr>
                @foreach($reportData['columns'] as $column)
                    <th>{{ $column }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($reportData['data'] as $user)
                <tr>
                    <td>{{ $user['id'] }}</td>
                    <td>{{ $user['name'] }}</td>
                    <td>{{ $user['email'] }}</td>
                    <td>{{ $user['user_type'] }}</td>
                    <td>{{ $user['is_tutor'] }}</td>
                    <td>{{ $user['is_mentor'] }}</td>
                    <td>{{ $user['created_at'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    
    <div class="footer">
        <p>This report is confidential and intended for authorized personnel only.</p>
        <p>© {{ date('Y') }} IS-PROJECT-1. All rights reserved.</p>
    </div>
</body>
</html> 