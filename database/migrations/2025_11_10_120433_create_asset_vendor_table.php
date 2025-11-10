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
        Schema::create('asset_vendor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained('assets')->onDelete('cascade');
            $table->foreignId('vendor_id')->constrained('vendors')->onDelete('cascade');
            $table->enum('relationship_type', ['Primary', 'Secondary', 'Support', 'Maintenance'])->default('Primary');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['asset_id', 'vendor_id']);
            $table->index(['asset_id']);
            $table->index(['vendor_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_vendor');
    }
};
