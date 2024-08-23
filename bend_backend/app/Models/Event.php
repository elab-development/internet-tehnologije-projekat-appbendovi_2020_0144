<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'event_name',
        'event_date',
        'user_id',
        'band_id',
        'location'
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
