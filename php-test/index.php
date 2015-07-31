<?php
require 'vendor/cosenary/instagram/src/Instagram.php';
use MetzWeb\Instagram\Instagram;

$instagram = new Instagram(array(
    'apiKey'      => '81aa944ceaac416db78252cd984ee03a',
    'apiSecret'   => '1ef1e168e862404f95f3bde49f1d1fe9',
    'apiCallback' => 'http://dev.gosh/myo-game-contest/php-test/'
));
$result = false;
$login = false;
$error = false;
if (isset($_GET['code'])) {
    $code = $_GET['code'];
    $data = $instagram->getOAuthToken($code);
    if(!isset($data->code)){
        $username = $username = $data->user->username;
        $instagram->setAccessToken($data);
        $result = $instagram->getUserMedia();
        echo 'Your username is: ' . $data->user->username;
        $usuario = $data->user;
        echo $usuario->profile_picture;
    }
    else{
        $login = true;
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

    $cont=0;
    echo "<script> var instaimage=[]";
        foreach ($result->data as $media) {
            if ($media->type !== 'video') {

                echo "instaimage[".$cont."]='".$image."'";

            }
            $cont++;
        }
        echo "</script>";
}



