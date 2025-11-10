<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContractRequest extends FormRequest
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
        $contractId = $this->route('contract')?->id ?? null;

        return [
            'vendor_id' => ['required', 'exists:vendors,id'],
            'title' => ['required', 'string', 'max:255'],
            'contract_no' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'in:AMC,Warranty,Subscription,Lease,Support'],
            'start_on' => ['required', 'date'],
            'end_on' => ['required', 'date', 'after_or_equal:start_on'],
            'auto_renew' => ['boolean'],
            'renewal_term_months' => ['nullable', 'integer', 'min:1'],
            'amount' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:8'],
            'billing_cycle' => ['required', 'in:Monthly,Yearly,One-time'],
            'cost_center' => ['nullable', 'string', 'max:255'],
            'po_number' => ['nullable', 'string', 'max:255'],
            'invoice_email' => ['nullable', 'email', 'max:255'],
            'termination_notice_days' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:Active,Expired,Cancelled'],
        ];
    }
}
