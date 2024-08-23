<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BandSong extends Model
{
    use HasFactory;

    protected $table = 'band_songs';

    protected $fillable = [
        'band_id',
        'name',
        'video_id',
    ];

    public function band()
    {
        return $this->belongsTo(Band::class);
    }

    public function chosenSong()
    {
        return $this->hasMany(ChosenSong::class);
    }
}
