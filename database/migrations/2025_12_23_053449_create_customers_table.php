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
        Schema::create('customers', function (Blueprint $table) {
            
            $table->id(); // auto-increment integer (PK)

            $table->string('customer_id')->unique(); // e.g. C000001

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('username')->nullable();
            $table->string('nationality')->nullable();
            $table->string('matric_staff_no')->nullable();
            $table->string('ic_passport')->nullable();
            $table->string('gender')->nullable();
            $table->string('faculty')->nullable();
            $table->string('residential_college')->nullable();
            $table->text('address')->nullable();
            $table->string('phone', 20)->nullable();

            $table->string('emergency_contact_name')->nullable();
            $table->string('relationship')->nullable();
            $table->string('emergency_phone', 20)->nullable();

            $table->string('license_no')->nullable();
            $table->date('license_expiry')->nullable();
            $table->string('license_image')->nullable();

            $table->string('identity_card_image')->nullable();
            $table->string('matric_staff_image')->nullable();

            $table->decimal('balance', 10, 2)->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
