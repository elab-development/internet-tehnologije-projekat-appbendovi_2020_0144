<?php

namespace App\Services;

class YouTubeService
{
    public function search($query)
    {
        $apikey = config('services.youtube.key');
        $query = str_replace(' ', '+', $query);
        $googleApiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' . $query . '&maxResults=5&key=' . $apikey;

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $googleApiUrl);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_VERBOSE, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        
        curl_close($ch);
        return $response;
    }
}
