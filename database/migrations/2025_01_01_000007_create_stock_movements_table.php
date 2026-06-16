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
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('batch_id')->constrained('medicine_batches');
            $table->foreignId('user_id')->constrained();
            $table->enum('reference_type', ['stock_in', 'sale', 'expired', 'adjustment']);
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->integer('qty_change');
            $table->integer('stock_before');
            $table->integer('stock_after');
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
