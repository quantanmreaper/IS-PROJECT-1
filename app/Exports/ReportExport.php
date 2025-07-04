<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Illuminate\Support\Collection;

class ReportExport implements FromArray, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    protected $reportData;

    public function __construct(array $reportData)
    {
        $this->reportData = $reportData;
    }

    /**
     * @return array
     */
    public function array(): array
    {
        // For summary report, we handle it differently
        if (isset($this->reportData['title']) && $this->reportData['title'] === 'Summary Report') {
            // Create a summary sheet with different sections
            $data = [];
            
            // Add header section
            $data[] = ['Summary Report'];
            $data[] = ['Date Range:', $this->reportData['date_range']];
            $data[] = []; // Empty row for spacing
            
            // Add key metrics
            $data[] = ['Key Metrics'];
            $data[] = ['Total Users:', $this->reportData['total_users']];
            $data[] = ['Total Courses:', $this->reportData['total_courses']];
            $data[] = ['Total Sessions:', $this->reportData['total_sessions']];
            $data[] = ['New Users (Period):', $this->reportData['new_users']];
            $data[] = ['New Courses (Period):', $this->reportData['new_courses']];
            $data[] = ['New Sessions (Period):', $this->reportData['new_sessions']];
            $data[] = []; // Empty row for spacing
            
            // Add user type distribution
            $data[] = ['User Type Distribution'];
            foreach ($this->reportData['user_types'] as $type => $count) {
                $data[] = [$type, $count];
            }
            $data[] = []; // Empty row for spacing
            
            // Add course status distribution
            $data[] = ['Course Status Distribution'];
            foreach ($this->reportData['course_statuses'] as $status => $count) {
                $data[] = [$status, $count];
            }
            $data[] = []; // Empty row for spacing
            
            // Add session status distribution
            $data[] = ['Session Status Distribution'];
            foreach ($this->reportData['session_statuses'] as $status => $count) {
                $data[] = [$status, $count];
            }
            
            return $data;
        }
        
        // Regular data export for other report types
        // Ensure we convert any Collection to array
        if (isset($this->reportData['data'])) {
            if ($this->reportData['data'] instanceof Collection) {
                return $this->reportData['data']->toArray();
            }
            return $this->reportData['data'];
        }
        
        return [];
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        // For summary report, we don't need headings
        if (isset($this->reportData['title']) && $this->reportData['title'] === 'Summary Report') {
            return []; // No headings for summary report
        }
        
        return $this->reportData['columns'] ?? [];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return $this->reportData['title'] ?? 'Report';
    }

    /**
     * @param Worksheet $sheet
     */
    public function styles(Worksheet $sheet)
    {
        // For summary report, style the headers
        if (isset($this->reportData['title']) && $this->reportData['title'] === 'Summary Report') {
            // Style the main title
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
            
            // Style the section headers
            $sheet->getStyle('A4')->getFont()->setBold(true)->setSize(14);
            $sheet->getStyle('A12')->getFont()->setBold(true)->setSize(14);
            
            // Determine row numbers for other section headers based on data length
            $userTypesRow = 13 + count($this->reportData['user_types']);
            $sheet->getStyle("A{$userTypesRow}")->getFont()->setBold(true)->setSize(14);
            
            $courseStatusesRow = $userTypesRow + 1 + count($this->reportData['course_statuses']);
            $sheet->getStyle("A{$courseStatusesRow}")->getFont()->setBold(true)->setSize(14);
        } else {
            // Style header row for regular reports
            $sheet->getStyle('A1:Z1')->getFont()->setBold(true);
        }
        
        return $sheet;
    }
} 