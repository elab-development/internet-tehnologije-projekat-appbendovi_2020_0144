<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavouriteBand extends Model
{
    use HasFactory;

    protected $table = 'favourite_bands';

    protected $fillable = [
        'band_id',
        'user_id',
    ];

    public function band()
    {
        return $this->belongsTo(Band::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
