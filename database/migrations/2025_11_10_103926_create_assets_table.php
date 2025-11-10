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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->enum('asset_type', ['router', 'switch', 'server', 'firewall', 'load_balancer', 'wifi_access_point', 'ups', 'other']);
            $table->string('name');
            $table->string('tag');
            $table->unsignedBigInteger('vendor_id')->nullable();
            $table->string('model');
            $table->string('serial');
            $table->unsignedBigInteger('location_id')->nullable();
            $table->enum('status', ['in_service', 'spare', 'rma', 'retired']);
            $table->date('purchase_date')->nullable();
            $table->date('warranty_end')->nullable();
            $table->timestamp('last_seen')->nullable();
            $table->text('notes')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['asset_type']);
            $table->index(['status']);
            $table->index(['asset_type', 'status']);
            $table->index(['location_id']);
            $table->index(['vendor_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
