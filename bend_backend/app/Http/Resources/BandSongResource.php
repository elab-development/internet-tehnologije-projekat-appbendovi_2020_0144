<?php

namespace App\Http\Resources;

use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BandSongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'band' => new BandResource(Band::find($this->band_id)),
            'name' => $this->name,
            'video_id' => $this->video_id,
        ];
    }
}
