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
        Schema::create('asset_networks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained('assets')->onDelete('cascade');
            $table->ipAddress('mgmt_ip');
            $table->string('hostname')->nullable();
            $table->string('os_firmware')->nullable();
            $table->integer('vlan')->nullable();
            $table->unsignedBigInteger('subnet_id')->nullable();
            $table->timestamps();

            $table->unique(['asset_id']); // One network config per asset for MVP
            $table->index(['mgmt_ip']);
            $table->index(['hostname']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_networks');
    }
};
