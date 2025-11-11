<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LicenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'product_key' => 'nullable|string|max:255',
            'license_key' => 'nullable|string|max:255',
            'version' => 'nullable|string|max:100',
            'vendor_id' => 'nullable|exists:vendors,id',
            'purchase_date' => 'nullable|date|before:today',
            'expiration_date' => 'nullable|date|after:purchase_date',
            'quantity' => 'required|integer|min:1',
            'cost' => 'nullable|numeric|min:0',
            'status' => 'required|in:Active,Expired,Suspended,Cancelled',
            'compliance_status' => 'required|in:Licensed,Unlicensed,Nulled,Trial,Evaluation',
            'notes' => 'nullable|string|max:1000',
        ];

        // For updates, exclude current record from unique validation if needed
        if ($this->route('license')) {
            // Add any unique validation rules if needed
        }

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'License name is required.',
            'quantity.required' => 'Quantity is required.',
            'quantity.min' => 'Quantity must be at least 1.',
            'cost.numeric' => 'Cost must be a valid number.',
            'cost.min' => 'Cost cannot be negative.',
            'purchase_date.before' => 'Purchase date cannot be in the future.',
            'expiration_date.after' => 'Expiration date must be after purchase date.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'vendor_id' => 'vendor',
            'product_key' => 'product key',
            'license_key' => 'license key',
        ];
    }
}
