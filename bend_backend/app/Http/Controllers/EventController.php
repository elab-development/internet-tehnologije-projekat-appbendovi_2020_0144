<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EventController extends AbstractController
{
    public function index(Request $request)
    {
        $events = Event::all();
        return $this->successResponse('Events retrieved successfully', EventResource::collection($events));
    }

    public function show(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return $this->errorResponse('Event not found', [], 404);
        }
        return $this->successResponse('Event retrieved successfully', new EventResource($event));
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'event_name' => 'required|string|max:255',
            'event_date' => 'required|date',
            'user_id' => 'required|integer',
            'band_id' => 'required|integer',
            'location' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $event = Event::create($request->all());

        return $this->successResponse('Event created successfully', new EventResource($event), 201);
    }

    public function destroy(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return $this->errorResponse('Event not found', [], 404);
        }
        $event->delete();
        return $this->successResponse('Event deleted successfully', $event);
    }

    public function myEvents($userId)
    {
        $events = Event::where('user_id', $userId)->get();
        return $this->successResponse('Events retrieved successfully', EventResource::collection($events));
    }

    public function songPerEvent(Request $request)
    {
        $songsPerEvent = DB::table('events')
            ->join('chosen_songs', 'events.id', '=', 'chosen_songs.event_id')
            ->join('band_songs', 'chosen_songs.band_song_id', '=', 'band_songs.id')
            ->groupBy('events.event_name')
            ->select('events.event_name', DB::raw('count(chosen_songs.band_song_id) as total_songs'))
            ->get();

        return $this->successResponse('Songs per event retrieved successfully', $songsPerEvent);
    }
}