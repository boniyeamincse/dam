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
        Schema::create('licenses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('product_key')->nullable();
            $table->string('license_key')->nullable();
            $table->string('version')->nullable();
            $table->unsignedBigInteger('vendor_id')->nullable();
            $table->date('purchase_date')->nullable();
            $table->date('expiration_date')->nullable();
            $table->integer('quantity')->default(1);
            $table->decimal('cost', 10, 2)->nullable();
            $table->enum('status', ['Active', 'Expired', 'Suspended', 'Cancelled'])->default('Active');
            $table->enum('compliance_status', ['Licensed', 'Unlicensed', 'Nulled', 'Trial', 'Evaluation'])->default('Licensed');
            $table->text('notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('set null');
            $table->index(['status', 'compliance_status']);
            $table->index('expiration_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses');
    }
};
