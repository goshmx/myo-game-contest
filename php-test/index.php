<?php
require 'vendor/cosenary/instagram/src/Instagram.php';
use MetzWeb\Instagram\Instagram;

$instagram = new Instagram(array(
    'apiKey'      => '',
    'apiSecret'   => '',
    'apiCallback' => ''
));
$result = false;
if (isset($_GET['code'])) {
    $code = $_GET['code'];
    $data = $instagram->getOAuthToken($code);
    if(!isset($data->code)){
        $username = $username = $data->user->username;
        $instagram->setAccessToken($data);
        $result = $instagram->getUserMedia();
        echo 'Your username is: ' . $data->user->username;
    }
    else{
        echo "<a href='{$instagram->getLoginUrl()}'>Connect to Intagram Account to play!</a>";
    }
} else {
    echo "<a href='{$instagram->getLoginUrl()}'>Connect to Intagram Account to play!</a>";
    if (isset($_GET['error'])) {
        echo 'Ha ocurrido un error: ' . $_GET['error_description'];
    }
}

if($result){
    foreach ($result->data as $media) {
        if ($media->type !== 'video') {
            $image = $media->images->low_resolution->url;
            echo "<img class=\"media\" src=\"{$image}\"/>";
        }
    }

}



