<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChosenSong extends Model
{
    use HasFactory;

    protected $table = 'chosen_songs';

    protected $fillable = [
        'band_song_id',
        'event_id',
    ];

    public function bandSong()
    {
        return $this->belongsTo(BandSong::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
