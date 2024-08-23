<?php

namespace App\Http\Controllers;

use App\Http\Resources\FavouriteBandResource;
use App\Models\FavouriteBand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FavouriteBandController extends AbstractController
{
    public function index(Request $request)
    {
        $favBands = FavouriteBand::all();
        return $this->successResponse('Favourite bands retrieved successfully', FavouriteBandResource::collection($favBands));
    }

    public function findByUser($userId)
    {
        $favBands = FavouriteBand::where('user_id', $userId)->get();
        return $this->successResponse('Favourite bands retrieved successfully', FavouriteBandResource::collection($favBands));
    }

    public function findByBand($bandId)
    {
        $favBands = FavouriteBand::where('band_id', $bandId)->get();
        return $this->successResponse('Favourite bands retrieved successfully', FavouriteBandResource::collection($favBands));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'band_id' => 'required|integer',
            'user_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $favBand = FavouriteBand::create($request->all());
        return $this->successResponse('Favourite band created successfully', new FavouriteBandResource($favBand), 201);
    }
}
