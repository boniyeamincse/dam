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
        Schema::create('switch_ports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained('assets')->onDelete('cascade');
            $table->string('port_name');
            $table->boolean('admin_up')->default(true);
            $table->boolean('oper_up')->nullable();
            $table->enum('vlan_mode', ['access', 'trunk'])->default('access');
            $table->text('vlan_ids')->nullable(); // CSV for trunk mode
            $table->boolean('poe')->default(false);
            $table->integer('speed_mbps')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();

            $table->index(['asset_id']);
            $table->index(['port_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('switch_ports');
    }
};
