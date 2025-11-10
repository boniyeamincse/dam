<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->onDelete('cascade');
            $table->string('title');
            $table->string('contract_no')->nullable();
            $table->enum('type', ['AMC', 'Warranty', 'Subscription', 'Lease', 'Support']);
            $table->date('start_on');
            $table->date('end_on');
            $table->boolean('auto_renew')->default(false);
            $table->integer('renewal_term_months')->nullable();
            $table->decimal('amount', 12, 2)->nullable();
            $table->string('currency', 8)->default('BDT');
            $table->enum('billing_cycle', ['Monthly', 'Yearly', 'One-time'])->default('Yearly');
            $table->string('cost_center')->nullable();
            $table->string('po_number')->nullable();
            $table->string('invoice_email')->nullable();
            $table->integer('termination_notice_days')->nullable();
            $table->enum('status', ['Active', 'Expired', 'Cancelled'])->default('Active');
            $table->timestamps();

            $table->index(['end_on', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
