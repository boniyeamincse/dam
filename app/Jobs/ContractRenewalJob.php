<?php

namespace App\Jobs;

use App\Models\Contract;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class ContractRenewalJob implements ShouldQueue
{
    use Queueable;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $expiringContracts = Contract::with('vendor')
            ->where('status', 'Active')
            ->where('end_on', '<=', now()->addDays(90))
            ->get();

        $alerts = [];

        foreach ($expiringContracts as $contract) {
            $daysLeft = $contract->days_until_expiry;

            if ($daysLeft <= 90) {
                $alerts[] = [
                    'contract' => $contract,
                    'days_left' => $daysLeft,
                    'priority' => $daysLeft <= 30 ? 'high' : ($daysLeft <= 60 ? 'medium' : 'low'),
                ];
            }
        }

        // For now, just log the alerts. In production, send emails/notifications
        if (!empty($alerts)) {
            \Log::info('Contract Renewal Alerts', [
                'count' => count($alerts),
                'alerts' => $alerts,
            ]);

            // TODO: Send email notification to admins
            // Mail::to(config('app.admin_email'))->send(new ContractRenewalAlert($alerts));
        }
    }
}
