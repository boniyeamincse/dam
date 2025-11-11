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
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['domain', 'subdomain']);
            $table->string('asset_id');
            $table->string('asset_tag');
            $table->enum('status', ['Active', 'Deactive']);
            $table->enum('environment', ['Planning', 'Development', 'Testing', 'Production']);
            $table->string('business_unit');
            $table->string('purpose');
            $table->string('primary_owner');
            $table->string('owner_email');
            $table->string('technical_owner');
            $table->string('tech_email');
            $table->string('registrar');
            $table->string('registrant_org');
            $table->date('registration_date');
            $table->date('expiry_date');
            $table->boolean('auto_renew');
            $table->integer('renewal_term');
            $table->decimal('cost_per_term', 10, 2);
            $table->string('currency');
            $table->string('billing_owner');
            $table->string('gl_cost_center');
            $table->string('nameserver1');
            $table->string('nameserver2');
            $table->string('cdn_waf');
            $table->string('primary_url');
            $table->string('redirect_target')->nullable();
            $table->text('notes')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['type']);
            $table->index(['status']);
            $table->index(['expiry_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};
