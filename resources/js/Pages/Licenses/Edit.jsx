import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Edit({ license, vendors }) {
    const { data, setData, put, processing, errors } = useForm({
        name: license.name,
        product_key: license.product_key || '',
        license_key: license.license_key || '',
        version: license.version || '',
        vendor_id: license.vendor_id || '',
        purchase_date: license.purchase_date,
        expiration_date: license.expiration_date,
        quantity: license.quantity,
        cost: license.cost || '',
        status: license.status,
        compliance_status: license.compliance_status,
        notes: license.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('licenses.update', license.id));
    };

    return (
        <AppLayout title={`Edit License: ${license.name}`}>
            <Head title={`Edit License: ${license.name}`} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <Link href={route('licenses.show', license.id)} className="text-gray-500 hover:text-gray-700 mr-4">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit License</h1>
                            <p className="text-gray-600 mt-1">Update license information</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Software Name *
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., Microsoft Office 365"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vendor
                                </label>
                                <select
                                    value={data.vendor_id}
                                    onChange={(e) => setData('vendor_id', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">Select Vendor</option>
                                    {vendors.map((vendor) => (
                                        <option key={vendor.id} value={vendor.id}>
                                            {vendor.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.vendor_id} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Version
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.version}
                                    onChange={(e) => setData('version', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., 2021, v16.0, Professional"
                                />
                                <InputError message={errors.version} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Key
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.product_key}
                                    onChange={(e) => setData('product_key', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                                />
                                <InputError message={errors.product_key} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    License Key
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.license_key}
                                    onChange={(e) => setData('license_key', e.target.value)}
                                    className="w-full"
                                    placeholder="License activation key"
                                />
                                <InputError message={errors.license_key} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity *
                                </label>
                                <TextInput
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="w-full"
                                    min="1"
                                />
                                <InputError message={errors.quantity} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cost
                                </label>
                                <TextInput
                                    type="number"
                                    value={data.cost}
                                    onChange={(e) => setData('cost', e.target.value)}
                                    className="w-full"
                                    step="0.01"
                                    placeholder="0.00"
                                />
                                <InputError message={errors.cost} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Purchase Date
                                </label>
                                <TextInput
                                    type="date"
                                    value={data.purchase_date}
                                    onChange={(e) => setData('purchase_date', e.target.value)}
                                    className="w-full"
                                />
                                <InputError message={errors.purchase_date} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiration Date
                                </label>
                                <TextInput
                                    type="date"
                                    value={data.expiration_date}
                                    onChange={(e) => setData('expiration_date', e.target.value)}
                                    className="w-full"
                                />
                                <InputError message={errors.expiration_date} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    License Status *
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Expired">Expired</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Compliance Status *
                                </label>
                                <select
                                    value={data.compliance_status}
                                    onChange={(e) => setData('compliance_status', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="Licensed">Licensed</option>
                                    <option value="Unlicensed">Unlicensed</option>
                                    <option value="Nulled">Nulled</option>
                                    <option value="Trial">Trial</option>
                                    <option value="Evaluation">Evaluation</option>
                                </select>
                                <InputError message={errors.compliance_status} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notes
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="4"
                                placeholder="Additional notes about this license..."
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href={route('licenses.show', license.id)}>
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <PrimaryButton type="submit" disabled={processing}>
                                Update License
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}