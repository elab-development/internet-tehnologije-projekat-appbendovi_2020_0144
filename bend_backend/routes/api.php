<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('search', [\App\Http\Controllers\YouTubeController::class, 'search']);
Route::get('find-by-band/{bandId}', [\App\Http\Controllers\BandSongController::class, 'getBandSongsByBand']);

Route::apiResource('bands', \App\Http\Controllers\BandController::class)->only('index', 'show');
Route::get('band-songs', [\App\Http\Controllers\BandSongController::class, 'index']);
Route::get('band-songs/{id}', [\App\Http\Controllers\BandSongController::class, 'show']);
Route::get('events', [\App\Http\Controllers\EventController::class, 'index']);
Route::get('events/{id}', [\App\Http\Controllers\EventController::class, 'show']);

Route::post('register', [\App\Http\Controllers\UserController::class, 'register']);
Route::post('login', [\App\Http\Controllers\UserController::class, 'login']);
Route::get('paginacija', [\App\Http\Controllers\ChosenSongController::class, 'paginationSongs']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('band-songs', [\App\Http\Controllers\BandSongController::class, 'index']);
    Route::apiResource('bands', \App\Http\Controllers\BandController::class)->only('store', 'update', 'destroy');
    Route::post('band-songs', [\App\Http\Controllers\BandSongController::class, 'store']);
    Route::put('band-songs/{id}', [\App\Http\Controllers\BandSongController::class, 'update']);
    Route::delete('band-songs/{id}', [\App\Http\Controllers\BandSongController::class, 'destroy']);
    Route::post('events', [\App\Http\Controllers\EventController::class, 'store']);
    Route::delete('events/{id}', [\App\Http\Controllers\EventController::class, 'destroy']);

    Route::post('logout', [\App\Http\Controllers\UserController::class, 'logout']);

    Route::apiResource('chosen-songs', \App\Http\Controllers\ChosenSongController::class);
    Route::get('chosen-songs-by-event/{eventId}', [\App\Http\Controllers\ChosenSongController::class, 'getChosenSongsByEvent']);
    Route::get('favourite-bands', [\App\Http\Controllers\FavouriteBandController::class, 'index']);
    Route::get('favourite-bands-by-user/{userId}', [\App\Http\Controllers\FavouriteBandController::class, 'findByUser']);
    Route::get('favourite-bands-by-band/{bandId}', [\App\Http\Controllers\FavouriteBandController::class, 'findByBand']);
    Route::post('favourite-bands', [\App\Http\Controllers\FavouriteBandController::class, 'store']);

});

