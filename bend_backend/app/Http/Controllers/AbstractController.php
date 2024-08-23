<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class AbstractController extends Controller
{

    public function successResponse($message, $data, $code = 200): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'success' => true,
            'message' => $message
        ], $code);
    }

    public function errorResponse($message, $errors = [],  $code = 404): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }
}
