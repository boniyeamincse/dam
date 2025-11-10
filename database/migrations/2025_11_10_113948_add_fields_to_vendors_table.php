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
        Schema::table('vendors', function (Blueprint $table) {
            $table->string('code')->nullable()->after('name');
            $table->enum('category', ['ISP', 'Hardware', 'Software', 'CCTV', 'Cloud', 'Other'])->after('code');
            $table->string('phone')->nullable()->after('contact_email');
            $table->string('website')->nullable()->after('phone');
            $table->text('address')->nullable()->after('website');
            $table->string('city')->nullable()->after('address');
            $table->string('country')->nullable()->after('city');
            $table->string('account_manager_name')->nullable()->after('country');
            $table->string('account_manager_email')->nullable()->after('account_manager_name');
            $table->string('account_manager_phone')->nullable()->after('account_manager_email');
            $table->string('support_email')->nullable()->after('account_manager_phone');
            $table->string('support_phone')->nullable()->after('support_email');
            $table->string('support_portal_url')->nullable()->after('support_phone');
            $table->integer('sla_hours')->nullable()->after('support_portal_url');
            $table->enum('status', ['Active', 'Inactive'])->default('Active')->after('sla_hours');

            $table->unique(['code']);
            $table->index(['category', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropUnique(['code']);
            $table->dropIndex(['category', 'status']);
            $table->dropColumn([
                'code', 'category', 'phone', 'website', 'address', 'city', 'country',
                'account_manager_name', 'account_manager_email', 'account_manager_phone',
                'support_email', 'support_phone', 'support_portal_url', 'sla_hours', 'status'
            ]);
        });
    }
};
