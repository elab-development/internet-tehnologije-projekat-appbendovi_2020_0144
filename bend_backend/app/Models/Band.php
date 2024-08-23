<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    use HasFactory;

    protected $table = 'bands';

    protected $fillable = [
        'name',
        'description',
    ];

    public function bandSongs()
    {
        return $this->hasMany(BandSong::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function favouriteBand()
    {
        return $this->hasMany(FavouriteBand::class);
    }
}
