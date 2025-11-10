import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, Download, FileText, CheckCircle, XCircle } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Import({ importResults }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('file', file);

        if (file) {
            // Show preview of first few rows
            const reader = new FileReader();
            reader.onload = (e) => {
                const csv = e.target.result;
                const lines = csv.split('\n').slice(0, 6); // Show first 5 rows + header
                setPreview(lines);
            };
            reader.readAsText(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('switches.import.post'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout title="Import Switches">
            <Head title="Import Switches" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={route('switches.index')}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Switches
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Import Switches</h1>
                </div>

                <SectionPanel>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">CSV Import</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-4">
                                Upload a CSV file to bulk import switches. Make sure your CSV follows the correct format.
                            </p>
                            <Link
                                href={route('switches.template')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download Template
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                                        Select CSV File
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        accept=".csv,.txt"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        required
                                    />
                                    {errors.file && (
                                        <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                                    )}
                                </div>

                                {preview && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">File Preview:</h4>
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                                            <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                                                {preview.join('\n')}
                                            </pre>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <PrimaryButton type="submit" disabled={processing || !data.file}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        {processing ? 'Importing...' : 'Import Switches'}
                                    </PrimaryButton>
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => {
                                            reset();
                                            setPreview(null);
                                        }}
                                        disabled={processing}
                                    >
                                        Clear
                                    </SecondaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </SectionPanel>

                {/* Import Results */}
                {importResults && (
                    <SectionPanel>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Import Results</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-gray-900">
                                    Successfully imported {importResults.success} switches
                                </span>
                            </div>

                            {importResults.errors && importResults.errors.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <XCircle className="w-5 h-5 text-red-600" />
                                        <span className="text-sm text-gray-900">
                                            {importResults.errors.length} errors encountered:
                                        </span>
                                    </div>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                                        {importResults.errors.map((error, index) => (
                                            <p key={index} className="text-sm text-red-700 mb-1">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <Link
                                    href={route('switches.index')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                                >
                                    View Switches
                                </Link>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
                                >
                                    Import Another File
                                </button>
                            </div>
                        </div>
                    </SectionPanel>
                )}
            </div>
        </AppLayout>
    );
}