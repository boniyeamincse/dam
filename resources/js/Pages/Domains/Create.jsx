import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        type: '',
        asset_id: '',
        asset_tag: '',
        status: '',
        environment: '',
        business_unit: '',
        purpose: '',
        primary_owner: '',
        owner_email: '',
        technical_owner: '',
        tech_email: '',
        registrar: '',
        registrant_org: '',
        registration_date: '',
        expiry_date: '',
        auto_renew: false,
        renewal_term: '',
        cost_per_term: '',
        currency: '',
        billing_owner: '',
        gl_cost_center: '',
        nameserver1: '',
        nameserver2: '',
        cdn_waf: '',
        primary_url: '',
        redirect_target: '',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('domains.store'));
    };

    return (
        <AppLayout title="Add Domain">
            <Head title="Add Domain" />

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Add New Domain</h1>
                    <p className="text-gray-600 mt-1">Create a new domain asset record</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="type" value="Type" />
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="domain">Domain</option>
                                    <option value="subdomain">Subdomain</option>
                                </select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="asset_id" value="Asset ID" />
                                <TextInput
                                    id="asset_id"
                                    value={data.asset_id}
                                    onChange={(e) => setData('asset_id', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.asset_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="asset_tag" value="Asset Tag" />
                                <TextInput
                                    id="asset_tag"
                                    value={data.asset_tag}
                                    onChange={(e) => setData('asset_tag', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.asset_tag} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Deactive">Deactive</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="environment" value="Environment" />
                                <select
                                    id="environment"
                                    value={data.environment}
                                    onChange={(e) => setData('environment', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="">Select Environment</option>
                                    <option value="Planning">Planning</option>
                                    <option value="Development">Development</option>
                                    <option value="Testing">Testing</option>
                                    <option value="Production">Production</option>
                                </select>
                                <InputError message={errors.environment} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="business_unit" value="Business Unit" />
                                <TextInput
                                    id="business_unit"
                                    value={data.business_unit}
                                    onChange={(e) => setData('business_unit', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.business_unit} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="purpose" value="Purpose" />
                                <TextInput
                                    id="purpose"
                                    value={data.purpose}
                                    onChange={(e) => setData('purpose', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.purpose} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="primary_url" value="Primary URL" />
                                <TextInput
                                    id="primary_url"
                                    value={data.primary_url}
                                    onChange={(e) => setData('primary_url', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.primary_url} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Ownership Information */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ownership Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="primary_owner" value="Primary Owner" />
                                <TextInput
                                    id="primary_owner"
                                    value={data.primary_owner}
                                    onChange={(e) => setData('primary_owner', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.primary_owner} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="owner_email" value="Owner Email" />
                                <TextInput
                                    id="owner_email"
                                    type="email"
                                    value={data.owner_email}
                                    onChange={(e) => setData('owner_email', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.owner_email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="technical_owner" value="Technical Owner" />
                                <TextInput
                                    id="technical_owner"
                                    value={data.technical_owner}
                                    onChange={(e) => setData('technical_owner', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.technical_owner} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="tech_email" value="Technical Email" />
                                <TextInput
                                    id="tech_email"
                                    type="email"
                                    value={data.tech_email}
                                    onChange={(e) => setData('tech_email', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.tech_email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="billing_owner" value="Billing Owner" />
                                <TextInput
                                    id="billing_owner"
                                    value={data.billing_owner}
                                    onChange={(e) => setData('billing_owner', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.billing_owner} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="gl_cost_center" value="GL Cost Center" />
                                <TextInput
                                    id="gl_cost_center"
                                    value={data.gl_cost_center}
                                    onChange={(e) => setData('gl_cost_center', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.gl_cost_center} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Registration & Renewal */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration & Renewal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="registrar" value="Registrar" />
                                <TextInput
                                    id="registrar"
                                    value={data.registrar}
                                    onChange={(e) => setData('registrar', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.registrar} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="registrant_org" value="Registrant Organization" />
                                <TextInput
                                    id="registrant_org"
                                    value={data.registrant_org}
                                    onChange={(e) => setData('registrant_org', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.registrant_org} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="registration_date" value="Registration Date" />
                                <TextInput
                                    id="registration_date"
                                    type="date"
                                    value={data.registration_date}
                                    onChange={(e) => setData('registration_date', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.registration_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="expiry_date" value="Expiry Date" />
                                <TextInput
                                    id="expiry_date"
                                    type="date"
                                    value={data.expiry_date}
                                    onChange={(e) => setData('expiry_date', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.expiry_date} className="mt-2" />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="auto_renew"
                                    type="checkbox"
                                    checked={data.auto_renew}
                                    onChange={(e) => setData('auto_renew', e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <InputLabel htmlFor="auto_renew" value="Auto Renew" className="ml-2" />
                                <InputError message={errors.auto_renew} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="renewal_term" value="Renewal Term (Years)" />
                                <TextInput
                                    id="renewal_term"
                                    type="number"
                                    value={data.renewal_term}
                                    onChange={(e) => setData('renewal_term', e.target.value)}
                                    className="mt-1 block w-full"
                                    min="1"
                                    required
                                />
                                <InputError message={errors.renewal_term} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="cost_per_term" value="Cost Per Term" />
                                <TextInput
                                    id="cost_per_term"
                                    type="number"
                                    step="0.01"
                                    value={data.cost_per_term}
                                    onChange={(e) => setData('cost_per_term', e.target.value)}
                                    className="mt-1 block w-full"
                                    min="0"
                                    required
                                />
                                <InputError message={errors.cost_per_term} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="currency" value="Currency" />
                                <TextInput
                                    id="currency"
                                    value={data.currency}
                                    onChange={(e) => setData('currency', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.currency} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="nameserver1" value="Nameserver 1" />
                                <TextInput
                                    id="nameserver1"
                                    value={data.nameserver1}
                                    onChange={(e) => setData('nameserver1', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.nameserver1} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="nameserver2" value="Nameserver 2" />
                                <TextInput
                                    id="nameserver2"
                                    value={data.nameserver2}
                                    onChange={(e) => setData('nameserver2', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.nameserver2} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="cdn_waf" value="CDN/WAF" />
                                <TextInput
                                    id="cdn_waf"
                                    value={data.cdn_waf}
                                    onChange={(e) => setData('cdn_waf', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.cdn_waf} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="redirect_target" value="Redirect Target" />
                                <TextInput
                                    id="redirect_target"
                                    value={data.redirect_target}
                                    onChange={(e) => setData('redirect_target', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.redirect_target} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
                        <div>
                            <InputLabel htmlFor="notes" value="Notes" />
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows="4"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                placeholder="Any additional notes or comments..."
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-500 hover:bg-gray-600"
                        >
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Domain'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}