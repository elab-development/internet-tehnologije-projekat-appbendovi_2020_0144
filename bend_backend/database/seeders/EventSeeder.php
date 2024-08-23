<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        foreach (range(1, 10) as $index) {
            \App\Models\Event::create([
                'event_name' => $faker->name,
                'location' => $faker->address,
                'event_date' => $faker->dateTimeBetween('now', '+1 years'),
                'band_id' => $faker->numberBetween(1, 4),
                'user_id' => $faker->numberBetween(1, 11),
            ]);
        }
    }
}
