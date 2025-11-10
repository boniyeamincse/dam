import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        category: '',
        phone: '',
        contact_email: '',
        website: '',
        address: '',
        city: '',
        country: '',
        account_manager_name: '',
        account_manager_email: '',
        account_manager_phone: '',
        support_email: '',
        support_phone: '',
        support_portal_url: '',
        sla_hours: '',
        status: 'Active',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/vendors');
    };

    return (
        <AppLayout>
            <Head title="Create Vendor" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link
                        href="/vendors"
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-foreground">Create Vendor</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Info */}
                    <SectionPanel title="Company Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="name" value="Vendor Name *" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="code" value="Vendor Code" />
                                <TextInput
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.code} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="category" value="Category *" />
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="ISP">ISP</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="CCTV">CCTV</option>
                                    <option value="Cloud">Cloud</option>
                                    <option value="Other">Other</option>
                                </select>
                                <InputError message={errors.category} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Status *" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Contact Info */}
                    <SectionPanel title="Contact Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="phone" value="Phone" />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="contact_email" value="Email" />
                                <TextInput
                                    id="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.contact_email} className="mt-2" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="website" value="Website" />
                                <TextInput
                                    id="website"
                                    type="url"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="https://"
                                />
                                <InputError message={errors.website} className="mt-2" />
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Address */}
                    <SectionPanel title="Address">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="address" value="Address" />
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="city" value="City" />
                                    <TextInput
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.city} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="country" value="Country" />
                                    <TextInput
                                        id="country"
                                        type="text"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.country} className="mt-2" />
                                </div>
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Account Manager */}
                    <SectionPanel title="Account Manager">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <InputLabel htmlFor="account_manager_name" value="Name" />
                                <TextInput
                                    id="account_manager_name"
                                    type="text"
                                    value={data.account_manager_name}
                                    onChange={(e) => setData('account_manager_name', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.account_manager_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="account_manager_email" value="Email" />
                                <TextInput
                                    id="account_manager_email"
                                    type="email"
                                    value={data.account_manager_email}
                                    onChange={(e) => setData('account_manager_email', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.account_manager_email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="account_manager_phone" value="Phone" />
                                <TextInput
                                    id="account_manager_phone"
                                    type="text"
                                    value={data.account_manager_phone}
                                    onChange={(e) => setData('account_manager_phone', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.account_manager_phone} className="mt-2" />
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Support */}
                    <SectionPanel title="Support Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="support_email" value="Support Email" />
                                <TextInput
                                    id="support_email"
                                    type="email"
                                    value={data.support_email}
                                    onChange={(e) => setData('support_email', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.support_email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="support_phone" value="Support Phone" />
                                <TextInput
                                    id="support_phone"
                                    type="text"
                                    value={data.support_phone}
                                    onChange={(e) => setData('support_phone', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.support_phone} className="mt-2" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="support_portal_url" value="Support Portal URL" />
                                <TextInput
                                    id="support_portal_url"
                                    type="url"
                                    value={data.support_portal_url}
                                    onChange={(e) => setData('support_portal_url', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="https://"
                                />
                                <InputError message={errors.support_portal_url} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="sla_hours" value="SLA Hours" />
                                <TextInput
                                    id="sla_hours"
                                    type="number"
                                    value={data.sla_hours}
                                    onChange={(e) => setData('sla_hours', e.target.value)}
                                    className="mt-1 block w-full"
                                    min="0"
                                />
                                <InputError message={errors.sla_hours} className="mt-2" />
                            </div>
                        </div>
                    </SectionPanel>

                    {/* Notes */}
                    <SectionPanel title="Notes">
                        <div>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                                placeholder="Additional notes..."
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>
                    </SectionPanel>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            href="/vendors"
                            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                            Cancel
                        </Link>
                        <PrimaryButton disabled={processing}>
                            <Save className="w-4 h-4 mr-2" />
                            Create Vendor
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}