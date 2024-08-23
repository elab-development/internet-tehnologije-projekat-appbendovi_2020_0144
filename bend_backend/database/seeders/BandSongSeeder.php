<?php

namespace Database\Seeders;

use App\Services\YouTubeService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BandSongSeeder extends Seeder
{

    public function __construct(private readonly YouTubeService $youTubeService)
    {
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bendovi = \App\Models\Band::all();

        foreach ($bendovi as $bend) {
            $response = $this->youTubeService->search($bend->name);
            $data = json_decode($response);
            foreach ($data->items as $item) {
                $videoId = $item->id->videoId ?? null;
                if (!$videoId) {
                    continue;
                }
                \App\Models\BandSong::create([
                    'band_id' => $bend->id,
                    'name' => $item->snippet->title,
                    'video_id' => $videoId,
                ]);
            }
        }
    }
}
