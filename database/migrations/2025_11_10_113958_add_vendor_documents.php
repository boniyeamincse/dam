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
        Schema::table('documents', function (Blueprint $table) {
            $table->foreignId('contract_id')->nullable()->after('asset_id')->constrained('contracts')->onDelete('cascade');
            $table->string('checksum')->nullable()->after('path');
            $table->unsignedBigInteger('uploaded_by')->nullable()->after('checksum');
            $table->timestamp('uploaded_at')->nullable()->after('uploaded_by');

            $table->index(['contract_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropIndex(['contract_id']);
            $table->dropForeign(['contract_id']);
            $table->dropColumn(['contract_id', 'checksum', 'uploaded_by', 'uploaded_at']);
        });
    }
};
