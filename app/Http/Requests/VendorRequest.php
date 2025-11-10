<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VendorRequest extends FormRequest
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
        $vendorId = $this->route('vendor')?->id ?? null;

        return [
            'name' => ['required', 'string', 'max:255', 'unique:vendors,name,' . $vendorId],
            'code' => ['nullable', 'string', 'max:255', 'unique:vendors,code,' . $vendorId],
            'category' => ['required', 'in:ISP,Hardware,Software,CCTV,Cloud,Other'],
            'phone' => ['nullable', 'string', 'max:255'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'address' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'account_manager_name' => ['nullable', 'string', 'max:255'],
            'account_manager_email' => ['nullable', 'email', 'max:255'],
            'account_manager_phone' => ['nullable', 'string', 'max:255'],
            'support_email' => ['nullable', 'email', 'max:255'],
            'support_phone' => ['nullable', 'string', 'max:255'],
            'support_portal_url' => ['nullable', 'url', 'max:255'],
            'sla_hours' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:Active,Inactive'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
