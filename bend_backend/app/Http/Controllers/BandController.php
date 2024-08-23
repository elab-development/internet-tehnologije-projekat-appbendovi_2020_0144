<?php

namespace App\Http\Controllers;

use App\Http\Resources\BandResource;
use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BandController extends AbstractController
{
    public function index()
    {
        $bands = Band::all();
        return $this->successResponse('Bands retrieved successfully', BandResource::collection($bands));
    }

    public function show($id)
    {
        $band = Band::find($id);
        if ($band) {
            return $this->successResponse('Band retrieved successfully', new BandResource($band));
        } else {
            return $this->errorResponse('Band not found', [], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $band = Band::create($request->all());
        return $this->successResponse('Band created successfully', new BandResource($band), 201);
    }

    public function update($id, Request $request)
    {
        $band = Band::find($id);

        if (!$band) {
            return $this->errorResponse('Band not found', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        $band->update($request->all());

        return $this->successResponse('Band updated successfully', new BandResource($band));
    }

    public function destroy($id)
    {
        $band = Band::find($id);

        if (!$band) {
            return $this->errorResponse('Band not found', [], 404);
        }

        $band->delete();

        return $this->successResponse('Band deleted successfully', []);
    }

}
