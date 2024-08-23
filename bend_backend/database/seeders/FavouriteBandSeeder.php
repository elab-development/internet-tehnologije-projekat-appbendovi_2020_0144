<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavouriteBandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 10) as $index) {
            \App\Models\FavouriteBand::create([
                'band_id' => rand(1, 4),
                'user_id' => rand(1, 11),
            ]);
        }
    }
}
