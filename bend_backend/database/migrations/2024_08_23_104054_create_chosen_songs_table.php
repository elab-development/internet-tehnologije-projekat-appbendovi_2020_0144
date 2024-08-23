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
        Schema::create('chosen_songs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('band_song_id');
            $table->unsignedBigInteger('event_id');

            $table->foreign('band_song_id')->references('id')->on('band_songs');
            $table->foreign('event_id')->references('id')->on('events');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chosen_songs');
    }
};
