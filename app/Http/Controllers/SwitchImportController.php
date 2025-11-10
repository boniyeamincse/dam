<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetNetwork;
use App\Models\Location;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SwitchImportController extends Controller
{
    public function showForm()
    {
        Gate::authorize('create', Asset::class);

        return Inertia::render('Switches/Import');
    }

    public function importCsv(Request $request)
    {
        Gate::authorize('create', Asset::class);

        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $file = $request->file('file');
        $data = array_map('str_getcsv', file($file->getRealPath()));
        $header = array_shift($data);

        // Expected columns
        $expectedColumns = [
            'name', 'tag', 'model', 'serial', 'vendor', 'location', 'status',
            'mgmt_ip', 'hostname', 'os_firmware', 'vlan', 'purchase_date', 'warranty_end', 'notes'
        ];

        // Validate header
        if (count($header) !== count($expectedColumns)) {
            return back()->withErrors(['file' => 'Invalid CSV format. Please check the column count.']);
        }

        $errors = [];
        $successCount = 0;
        $skippedCount = 0;

        foreach ($data as $index => $row) {
            $rowNumber = $index + 2; // +2 because array is 0-indexed and header is removed

            if (count($row) !== count($header)) {
                $errors[] = "Row {$rowNumber}: Column count mismatch.";
                continue;
            }

            $rowData = array_combine($header, $row);

            // Skip empty rows
            if (empty(array_filter($rowData))) {
                continue;
            }

            $validator = Validator::make($rowData, [
                'name' => 'required|string|max:255',
                'tag' => 'required|string|max:255|unique:assets,tag',
                'model' => 'nullable|string|max:255',
                'serial' => 'nullable|string|max:255',
                'vendor' => 'nullable|string|max:255',
                'location' => 'required|string|max:255',
                'status' => 'required|in:in_service,spare,rma,retired',
                'mgmt_ip' => 'nullable|ip',
                'hostname' => 'nullable|string|max:255',
                'os_firmware' => 'nullable|string|max:255',
                'vlan' => 'nullable|integer|min:1|max:4094',
                'purchase_date' => 'nullable|date',
                'warranty_end' => 'nullable|date',
                'notes' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                $errors[] = "Row {$rowNumber}: " . implode(', ', $validator->errors()->all());
                continue;
            }

            try {
                // Find or create vendor
                $vendor = null;
                if (!empty($rowData['vendor'])) {
                    $vendor = Vendor::firstOrCreate(['name' => trim($rowData['vendor'])]);
                }

                // Find or create location
                $location = Location::firstOrCreate(['name' => trim($rowData['location'])]);

                // Create asset
                $asset = Asset::create([
                    'asset_type' => 'switch',
                    'name' => trim($rowData['name']),
                    'tag' => trim($rowData['tag']),
                    'model' => trim($rowData['model'] ?? ''),
                    'serial' => trim($rowData['serial'] ?? ''),
                    'vendor_id' => $vendor?->id,
                    'location_id' => $location->id,
                    'status' => $rowData['status'],
                    'purchase_date' => !empty($rowData['purchase_date']) ? trim($rowData['purchase_date']) : null,
                    'warranty_end' => !empty($rowData['warranty_end']) ? trim($rowData['warranty_end']) : null,
                    'notes' => trim($rowData['notes'] ?? ''),
                ]);

                // Create network data if provided
                if (!empty($rowData['mgmt_ip']) || !empty($rowData['hostname'])) {
                    AssetNetwork::create([
                        'asset_id' => $asset->id,
                        'mgmt_ip' => trim($rowData['mgmt_ip'] ?? ''),
                        'hostname' => trim($rowData['hostname'] ?? ''),
                        'os_firmware' => trim($rowData['os_firmware'] ?? ''),
                        'vlan' => !empty($rowData['vlan']) ? (int)$rowData['vlan'] : null,
                    ]);
                }

                $successCount++;
            } catch (\Exception $e) {
                $errors[] = "Row {$rowNumber}: " . $e->getMessage();
            }
        }

        return back()->with([
            'success' => "Import completed. {$successCount} switches imported successfully.",
            'importResults' => [
                'success' => $successCount,
                'errors' => $errors,
            ],
        ]);
    }

    public function templateCsv()
    {
        Gate::authorize('create', Asset::class);

        $filename = 'switches_import_template.csv';

        return new StreamedResponse(function () {
            $handle = fopen('php://output', 'w');

            // CSV headers
            fputcsv($handle, [
                'name',
                'tag',
                'model',
                'serial',
                'vendor',
                'location',
                'status',
                'mgmt_ip',
                'hostname',
                'os_firmware',
                'vlan',
                'purchase_date',
                'warranty_end',
                'notes',
            ]);

            // Sample data
            fputcsv($handle, [
                'Core Switch 01',
                'AKJ-SW-0001',
                'Cisco Catalyst 2960',
                'ABC123456',
                'Cisco',
                'Data Center A',
                'in_service',
                '192.168.1.10',
                'core-sw01.akij.net',
                '15.0(2)SE11',
                '10',
                '2023-01-15',
                '2026-01-15',
                'Primary core switch for floor 1',
            ]);

            fputcsv($handle, [
                'Access Switch 01',
                'AKJ-SW-0002',
                'Cisco Catalyst 2960',
                'DEF789012',
                'Cisco',
                'Floor 2 Server Room',
                'in_service',
                '192.168.1.11',
                'access-sw01.akij.net',
                '15.0(2)SE11',
                '20',
                '2023-02-01',
                '2026-02-01',
                'Access switch for workstations',
            ]);

            fclose($handle);
        }, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
