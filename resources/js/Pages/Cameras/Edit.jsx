import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Edit({ camera, locations, vendors }) {
    const { data, setData, put, processing, errors } = useForm({
        name: camera.name,
        tag: camera.tag,
        vendor_id: camera.vendor_id,
        model: camera.model,
        serial: camera.serial,
        location_id: camera.location_id,
        status: camera.status,
        mgmt_ip: camera.network?.mgmt_ip || '',
        hostname: camera.network?.hostname || '',
        os_firmware: camera.network?.os_firmware || '',
        vlan: camera.network?.vlan || '',
        purchase_date: camera.purchase_date,
        warranty_end: camera.warranty_end,
        notes: camera.notes,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('cameras.update', camera.id));
    };

    return (
        <AppLayout title={`Edit Camera: ${camera.name}`}>
            <Head title={`Edit Camera: ${camera.name}`} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <Link href={route('cameras.show', camera.id)} className="text-gray-500 hover:text-gray-700 mr-4">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Camera</h1>
                            <p className="text-gray-600 mt-1">Update camera information</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name *
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., Security Camera 1"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Asset Tag *
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.tag}
                                    onChange={(e) => setData('tag', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., CAM-001"
                                />
                                <InputError message={errors.tag} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vendor
                                </label>
                                <select
                                    value={data.vendor_id || ''}
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
                                    Model *
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., DS-2CD2042WD-I"
                                />
                                <InputError message={errors.model} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Serial Number *
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.serial}
                                    onChange={(e) => setData('serial', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., ABC123456789"
                                />
                                <InputError message={errors.serial} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <select
                                    value={data.location_id || ''}
                                    onChange={(e) => setData('location_id', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">Select Location</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.location_id} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Spare">Spare</option>
                                    <option value="RMA">RMA</option>
                                    <option value="Retired">Retired</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Management IP *
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.mgmt_ip}
                                    onChange={(e) => setData('mgmt_ip', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., 192.168.1.100"
                                />
                                <InputError message={errors.mgmt_ip} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hostname
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.hostname}
                                    onChange={(e) => setData('hostname', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., camera01.example.com"
                                />
                                <InputError message={errors.hostname} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    OS/Firmware
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.os_firmware}
                                    onChange={(e) => setData('os_firmware', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., V5.5.0 build 180730"
                                />
                                <InputError message={errors.os_firmware} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    VLAN
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.vlan}
                                    onChange={(e) => setData('vlan', e.target.value)}
                                    className="w-full"
                                    placeholder="e.g., VLAN 100"
                                />
                                <InputError message={errors.vlan} className="mt-2" />
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
                                    Warranty End Date
                                </label>
                                <TextInput
                                    type="date"
                                    value={data.warranty_end}
                                    onChange={(e) => setData('warranty_end', e.target.value)}
                                    className="w-full"
                                />
                                <InputError message={errors.warranty_end} className="mt-2" />
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
                                placeholder="Additional notes about this camera..."
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href={route('cameras.show', camera.id)}>
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <PrimaryButton type="submit" disabled={processing}>
                                Update Camera
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}