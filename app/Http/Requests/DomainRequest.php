<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DomainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|in:domain,subdomain',
            'asset_id' => 'required|string|max:255',
            'asset_tag' => 'required|string|max:255',
            'status' => 'required|in:Active,Deactive',
            'environment' => 'required|in:Planning,Development,Testing,Production',
            'business_unit' => 'required|string|max:255',
            'purpose' => 'required|string|max:255',
            'primary_owner' => 'required|string|max:255',
            'owner_email' => 'required|email|max:255',
            'technical_owner' => 'required|string|max:255',
            'tech_email' => 'required|email|max:255',
            'registrar' => 'required|string|max:255',
            'registrant_org' => 'required|string|max:255',
            'registration_date' => 'required|date',
            'expiry_date' => 'required|date|after:registration_date',
            'auto_renew' => 'boolean',
            'renewal_term' => 'required|integer|min:1',
            'cost_per_term' => 'required|numeric|min:0|max:99999999.99',
            'currency' => 'required|string|max:10',
            'billing_owner' => 'required|string|max:255',
            'gl_cost_center' => 'required|string|max:255',
            'nameserver1' => 'required|string|max:255',
            'nameserver2' => 'nullable|string|max:255',
            'cdn_waf' => 'nullable|string|max:255',
            'primary_url' => 'required|string|max:255',
            'redirect_target' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ];
    }
}
