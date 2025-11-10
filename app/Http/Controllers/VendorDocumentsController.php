<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VendorDocumentsController extends Controller
{
    public function index(Vendor $vendor)
    {
        $documents = $vendor->documents()
            ->when(request('type'), function ($query) {
                $query->where('type', request('type'));
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return inertia('Vendors/Documents/Index', [
            'vendor' => $vendor,
            'documents' => $documents,
            'filters' => request()->only(['type']),
        ]);
    }

    public function store(Request $request, Vendor $vendor)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'required|file|max:10240', // 10MB
            'doc_type' => 'required|in:NDA,PO,Invoice,SOW,MSA,Certificate,Other',
            'notes' => 'nullable|string',
        ]);

        $documents = [];

        foreach ($request->file('files') as $file) {
            $filename = $file->getClientOriginalName();
            $path = $file->store('vendor-documents', 'public');
            $checksum = hash_file('sha256', $file->getRealPath());

            $documents[] = $vendor->documents()->create([
                'type' => $request->doc_type,
                'name' => $request->doc_type . ' - ' . $filename,
                'filename' => $filename,
                'path' => $path,
                'mime_type' => $file->getMimeType(),
                'size_bytes' => $file->getSize(),
                'description' => $request->notes,
                'checksum' => $checksum,
                'uploaded_by' => auth()->id(),
                'uploaded_at' => now(),
            ]);
        }

        return back()->with('success', count($documents) . ' document(s) uploaded successfully.');
    }

    public function destroy(Vendor $vendor, Document $doc)
    {
        Storage::disk('public')->delete($doc->path);
        $doc->delete();

        return back()->with('success', 'Document deleted successfully.');
    }

    public function download(Vendor $vendor, Document $doc)
    {
        if (!Storage::disk('public')->exists($doc->path)) {
            abort(404);
        }

        return Storage::disk('public')->download($doc->path, $doc->filename);
    }

    public function globalIndex()
    {
        $documents = Document::with(['asset', 'contract.vendor'])
            ->whereNotNull('contract_id')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return inertia('Vendors/Documents/GlobalIndex', [
            'documents' => $documents,
        ]);
    }
}
