<?php

namespace App\Http\Controllers;

use App\Http\Resources\BandSongResource;
use App\Models\BandSong;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BandSongController extends AbstractController
{
    public function index(Request $request)
    {
        $bandSongs = BandSong::all();
        return $this->successResponse('Band Songs retrieved successfully', BandSongResource::collection($bandSongs));
    }

    public function show($id)
    {
        $bandSong = BandSong::find($id);
        if ($bandSong) {
            return $this->successResponse('Band Song retrieved successfully', new BandSongResource($bandSong));
        } else {
            return $this->errorResponse('Band Song not found', [], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'band_id' => 'required|integer',
            'video_id' => 'required|string',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $bandSong = BandSong::create($request->all());
        return $this->successResponse('Band Song created successfully', new BandSongResource($bandSong), 201);
    }

    public function update($id, Request $request)
    {
        $bandSong = BandSong::find($id);

        if (!$bandSong) {
            return $this->errorResponse('Band Song not found', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'band_id' => 'required|integer',
            'video_id' => 'required|string',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $bandSong->update($request->all());
        return $this->successResponse('Band Song updated successfully', new BandSongResource($bandSong));
    }

    public function destroy($id)
    {
        $bandSong = BandSong::find($id);

        if (!$bandSong) {
            return $this->errorResponse('Band Song not found', [], 404);
        }

        $bandSong->delete();
        return $this->successResponse('Band Song deleted successfully', []);
    }

    public function getBandSongsByBand(Request $request, $bandId)
    {
        $bandSongs = BandSong::where('band_id', $bandId)->get();
        return $this->successResponse('Band Songs retrieved successfully', BandSongResource::collection($bandSongs));
    }
}

