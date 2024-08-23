<?php

namespace App\Http\Controllers;

use App\Services\YouTubeService;
use Illuminate\Http\Request;

class YouTubeController extends Controller
{
    public function __construct(private  readonly YouTubeService $youTubeService)
    {
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $response = $this->youTubeService->search($search);
        $data = json_decode($response);
        return response()->json($data);
    }
}
