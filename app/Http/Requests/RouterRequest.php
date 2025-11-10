<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RouterRequest extends FormRequest
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
            'tag' => 'required|string|max:255|unique:assets,tag',
            'model' => 'required|string|max:255',
            'serial' => 'required|string|max:255',
            'status' => 'required|in:Active,Spare,RMA,Retired',
            'purchase_date' => 'nullable|date|before:today',
            'warranty_end' => 'nullable|date|after:purchase_date',
            'notes' => 'nullable|string|max:1000',

            // Network fields
            'mgmt_ip' => 'required|ip|unique:asset_networks,mgmt_ip',
            'hostname' => 'nullable|string|max:255',
            'os_firmware' => 'nullable|string|max:255',
            'vlan' => 'nullable|string|max:255',
        ];

        // For updates, exclude current record from unique validation
        if ($this->route('router')) {
            $routerId = $this->route('router')->id;
            $rules['tag'] .= ',' . $routerId . ',id';
            $rules['mgmt_ip'] = 'required|ip|unique:asset_networks,mgmt_ip,' . $routerId . ',asset_id';
        }

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Router name is required.',
            'tag.required' => 'Asset tag is required.',
            'tag.unique' => 'This asset tag is already in use.',
            'model.required' => 'Model is required.',
            'serial.required' => 'Serial number is required.',
            'status.required' => 'Status is required.',
            'mgmt_ip.required' => 'Management IP is required.',
            'mgmt_ip.ip' => 'Management IP must be a valid IP address.',
            'mgmt_ip.unique' => 'This management IP is already in use.',
            'purchase_date.before' => 'Purchase date cannot be in the future.',
            'warranty_end.after' => 'Warranty end date must be after purchase date.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'tag' => 'asset tag',
            'mgmt_ip' => 'management IP',
            'os_firmware' => 'OS/firmware',
        ];
    }
}
