<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SwitchRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $assetId = $this->route('id') ?? null;
        $uniqueTag = $assetId ? "unique:assets,tag,{$assetId}" : 'unique:assets,tag';

        return [
            'name' => 'required|string|max:255',
            'tag' => ['required', 'string', 'max:255', $uniqueTag],
            'status' => 'required|in:in_service,spare,rma,retired',
            'location_id' => 'required|exists:locations,id',
            'vendor_id' => 'nullable|exists:vendors,id',
            'model' => 'nullable|string|max:255',
            'serial' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'warranty_end' => 'nullable|date|after:purchase_date',
            'notes' => 'nullable|string',

            // Network fields
            'network.mgmt_ip' => 'nullable|ip',
            'network.hostname' => 'nullable|string|max:255',
            'network.os_firmware' => 'nullable|string|max:255',
            'network.vlan' => 'nullable|integer|min:1|max:4094',
            'network.subnet_id' => 'nullable|exists:subnets,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'tag.unique' => 'This tag is already in use.',
            'location_id.required' => 'Location is required.',
            'location_id.exists' => 'Selected location does not exist.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Ensure network data is properly formatted
        if ($this->network) {
            $network = $this->network;
            if (isset($network['vlan']) && $network['vlan'] !== null) {
                $network['vlan'] = (int)$network['vlan'];
            }
            $this->merge(['network' => $network]);
        }
    }
}
