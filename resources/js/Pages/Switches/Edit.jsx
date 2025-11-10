import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ asset, locations, vendors }) {
    const { data, setData, put, processing, errors } = useForm({
        name: asset.name,
        tag: asset.tag,
        model: asset.model || '',
        serial: asset.serial || '',
        status: asset.status,
        location_id: asset.location_id,
        vendor_id: asset.vendor_id || '',
        purchase_date: asset.purchase_date || '',
        warranty_end: asset.warranty_end || '',
        notes: asset.notes || '',
        network: {
            mgmt_ip: asset.network?.mgmt_ip || '',
            hostname: asset.network?.hostname || '',
            os_firmware: asset.network?.os_firmware || '',
            vlan: asset.network?.vlan || '',
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('switches.update', asset.id));
    };

    const handleNetworkChange = (field, value) => {
        setData('network', {
            ...data.network,
            [field]: value
        });
    };

    return (
        <AppLayout title={`Edit ${asset.name}`}>
            <Head title={`Edit ${asset.name}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={route('switches.show', asset.id)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Switch
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Switch</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Asset Information */}
                        <SectionPanel>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" required />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="tag" value="Tag" required />
                                    <TextInput
                                        id="tag"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.tag}
                                        onChange={(e) => setData('tag', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.tag} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="model" value="Model" />
                                    <TextInput
                                        id="model"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                    />
                                    <InputError message={errors.model} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="serial" value="Serial Number" />
                                    <TextInput
                                        id="serial"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.serial}
                                        onChange={(e) => setData('serial', e.target.value)}
                                    />
                                    <InputError message={errors.serial} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="status" value="Status" required />
                                    <select
                                        id="status"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        required
                                    >
                                        <option value="in_service">In Service</option>
                                        <option value="spare">Spare</option>
                                        <option value="rma">RMA</option>
                                        <option value="retired">Retired</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>
                        </SectionPanel>

                        {/* Network Information */}
                        <SectionPanel>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Network Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="mgmt_ip" value="Management IP" />
                                    <TextInput
                                        id="mgmt_ip"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.network.mgmt_ip}
                                        onChange={(e) => handleNetworkChange('mgmt_ip', e.target.value)}
                                        placeholder="192.168.1.10"
                                    />
                                    <InputError message={errors['network.mgmt_ip']} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="hostname" value="Hostname" />
                                    <TextInput
                                        id="hostname"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.network.hostname}
                                        onChange={(e) => handleNetworkChange('hostname', e.target.value)}
                                        placeholder="switch01.akij.net"
                                    />
                                    <InputError message={errors['network.hostname']} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="os_firmware" value="OS/Firmware" />
                                    <TextInput
                                        id="os_firmware"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.network.os_firmware}
                                        onChange={(e) => handleNetworkChange('os_firmware', e.target.value)}
                                        placeholder="15.0(2)SE11"
                                    />
                                    <InputError message={errors['network.os_firmware']} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="vlan" value="VLAN" />
                                    <TextInput
                                        id="vlan"
                                        type="number"
                                        min="1"
                                        max="4094"
                                        className="mt-1 block w-full"
                                        value={data.network.vlan}
                                        onChange={(e) => handleNetworkChange('vlan', e.target.value)}
                                        placeholder="10"
                                    />
                                    <InputError message={errors['network.vlan']} className="mt-2" />
                                </div>
                            </div>
                        </SectionPanel>

                        {/* Location & Vendor */}
                        <SectionPanel>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Vendor</h3>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="location_id" value="Location" required />
                                    <select
                                        id="location_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.location_id}
                                        onChange={(e) => setData('location_id', e.target.value)}
                                        required
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
                                    <InputLabel htmlFor="vendor_id" value="Vendor" />
                                    <select
                                        id="vendor_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.vendor_id}
                                        onChange={(e) => setData('vendor_id', e.target.value)}
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
                            </div>
                        </SectionPanel>

                        {/* Ownership & Warranty */}
                        <SectionPanel>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Ownership & Warranty</h3>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="purchase_date" value="Purchase Date" />
                                    <TextInput
                                        id="purchase_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.purchase_date}
                                        onChange={(e) => setData('purchase_date', e.target.value)}
                                    />
                                    <InputError message={errors.purchase_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="warranty_end" value="Warranty End" />
                                    <TextInput
                                        id="warranty_end"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.warranty_end}
                                        onChange={(e) => setData('warranty_end', e.target.value)}
                                    />
                                    <InputError message={errors.warranty_end} className="mt-2" />
                                </div>
                            </div>
                        </SectionPanel>
                    </div>

                    {/* Notes */}
                    <SectionPanel>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                        <div>
                            <textarea
                                id="notes"
                                rows="4"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Additional notes about this switch..."
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>
                    </SectionPanel>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <SecondaryButton
                            type="button"
                            onClick={() => window.history.back()}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Saving...' : 'Update Switch'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}