<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChosenSongResource;
use App\Models\ChosenSong;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ChosenSongController extends AbstractController
{
    public function index(Request $request)
    {
        $chosenSongs = ChosenSong::all();
        return $this->successResponse('Chosen songs retrieved successfully', ChosenSongResource::collection($chosenSongs));
    }

    public function show($id)
    {
        $chosenSong = ChosenSong::find($id);
        if ($chosenSong) {
            return $this->successResponse('Chosen song retrieved successfully', new ChosenSongResource($chosenSong));
        } else {
            return $this->errorResponse('Chosen song not found', [], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'band_song_id' => 'required|integer',
            'event_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $chosenSong = ChosenSong::create($request->all());
        return $this->successResponse('Chosen song created successfully', new ChosenSongResource($chosenSong), 201);
    }

    public function update($id, Request $request)
    {
        $chosenSong = ChosenSong::find($id);

        if (!$chosenSong) {
            return $this->errorResponse('Chosen song not found', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'band_song_id' => 'required|integer',
            'event_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $chosenSong->update($request->all());
        return $this->successResponse('Chosen song updated successfully', new ChosenSongResource($chosenSong));
    }

    public function destroy($id)
    {
        $chosenSong = ChosenSong::find($id);
        if (!$chosenSong) {
            return $this->errorResponse('Chosen song not found', [], 404);
        }
        $chosenSong->delete();
        return $this->successResponse('Chosen song deleted successfully', $chosenSong);
    }

    public function getChosenSongsByEvent(Request $request, $eventId)
    {
        $chosenSongs = ChosenSong::where('event_id', $eventId)->get();
        return $this->successResponse('Chosen songs retrieved successfully', ChosenSongResource::collection($chosenSongs));
    }

    public function paginationSongs(Request $request)
    {
        $chosenSongs = DB::table('chosen_songs')
            ->join('band_songs', 'chosen_songs.band_song_id', '=', 'band_songs.id')
            ->join('bands', 'band_songs.band_id', '=', 'bands.id')
            ->join('events', 'chosen_songs.event_id', '=', 'events.id')
            ->select('chosen_songs.id', 'bands.name as band_name', 'band_songs.name as song_title', 'events.event_name')
            ->orderBy('chosen_songs.id', 'desc')
            ->paginate(3);

        return $this->successResponse('Chosen songs retrieved successfully', $chosenSongs);
    }
}
