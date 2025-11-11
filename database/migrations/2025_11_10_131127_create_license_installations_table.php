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
        Schema::create('license_installations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('license_id');
            $table->string('hostname')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('mac_address')->nullable();
            $table->string('user')->nullable();
            $table->string('department')->nullable();
            $table->date('installed_date');
            $table->date('last_used')->nullable();
            $table->enum('status', ['Active', 'Inactive', 'Removed'])->default('Active');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('license_id')->references('id')->on('licenses')->onDelete('cascade');
            $table->index(['license_id', 'status']);
            $table->index('hostname');
            $table->index('ip_address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('license_installations');
    }
};
