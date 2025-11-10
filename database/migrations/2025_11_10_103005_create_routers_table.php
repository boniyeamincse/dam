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
        Schema::create('routers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('asset_tag');
            $table->string('vendor');
            $table->string('model');
            $table->string('serial');
            $table->string('location');
            $table->enum('status', ['Active', 'Spare', 'RMA', 'Retired']);
            $table->string('mgmt_ip');
            $table->string('hostname');
            $table->string('os_firmware');
            $table->string('vlan');
            $table->string('subnet');
            $table->date('purchase_date')->nullable();
            $table->date('warranty_end')->nullable();
            $table->text('notes')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routers');
    }
};
