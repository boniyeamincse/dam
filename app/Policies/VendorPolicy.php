<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Auth\Access\Response;

class VendorPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Org Admin', 'IT Engineer', 'Viewer/Auditor']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Vendor $vendor): bool
    {
        return $user->hasAnyRole(['Org Admin', 'IT Engineer', 'Viewer/Auditor']);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['Org Admin', 'IT Engineer']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Vendor $vendor): bool
    {
        return $user->hasAnyRole(['Org Admin', 'IT Engineer']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Vendor $vendor): bool
    {
        return $user->hasRole('Org Admin'); // Only Org Admin can delete vendors
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Vendor $vendor): bool
    {
        return $user->hasRole('Org Admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Vendor $vendor): bool
    {
        return $user->hasRole('Org Admin');
    }
}
