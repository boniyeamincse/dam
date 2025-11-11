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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('theme', ['light', 'slate'])->default('light');
            $table->enum('density', ['comfortable', 'compact'])->default('comfortable');
            $table->string('date_format', 20)->default('DD/MM/YYYY');
            $table->integer('page_size')->default(25);
            $table->boolean('notifications_enabled')->default(true);
            $table->boolean('email_alerts')->default(true);
            $table->boolean('system_alerts')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['theme', 'density', 'date_format', 'page_size', 'notifications_enabled', 'email_alerts', 'system_alerts']);
        });
    }
};
