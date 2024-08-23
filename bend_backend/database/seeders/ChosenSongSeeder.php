<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChosenSongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $bandSongs = \App\Models\BandSong::all();
        foreach (range(1, 10) as $index) {
            \App\Models\ChosenSong::create([
                'band_song_id' => $faker->randomElement($bandSongs)->id ,
                'event_id' => rand(1, 10),
            ]);
        }
    }
}
