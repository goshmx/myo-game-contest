<?php
require 'vendor/cosenary/instagram/src/Instagram.php';
use MetzWeb\Instagram\Instagram;

$instagram = new Instagram(array(
    'apiKey'      => '81aa944ceaac416db78252cd984ee03a',
    'apiSecret'   => '1ef1e168e862404f95f3bde49f1d1fe9',
    'apiCallback' => 'http://goshmx.com/memorama/'
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
        //echo 'Your username is: ' . $data->user->username;
        $usuario = $data->user;
        //echo $usuario->profile_picture;
    }
    else{
        $login = true;
    }
} else {
    $login = true;
    if (isset($_GET['error'])) {
        $error = true;
    }
}
?>
<!doctype html>
<html class=no-js lang=en>
<head> <meta charset=utf-8> <meta name=description> <meta name=viewport content="width=device-width, initial-scale=1"> <title>MYO Memorama</title>  <link rel=stylesheet href=styles/main.css> <script src=scripts/vendor/modernizr.js></script>
    <script>
        var instaimage=[];
        <?php
        if($result){
          $cont=0;
          foreach ($result->data as $media) {
              if ($media->type !== 'video') {
                  $image = $media->images->low_resolution->url;
                  echo "instaimage[".$cont."]='".$image."';";
                  $cont++;
              }

          }
        }
        ?>
    </script>
</head>
<body> <!--[if lt IE 10]> <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->
    <header>
        <div id=main-head>
            <div id=logo><img src=images/logo.png alt="Memorama App"></div>
            <?php
                if($login == false){
            ?>
            <div id=user> <p>Logged in as <?php echo $data->user->username; ?></p> <img src=<?php echo $usuario->profile_picture; ?>> </div>
            <?php
                }
            ?>
        </div>

        <div id=navbar> <ul id=menu> <li><a href=#modal-instructions>Instructions</a></li> <li><a href=#modal-about>About</a></li> <li class=share>Share <a target=_blank id=share_fb href="https://www.facebook.com/sharer/sharer.php?u=http://goshmx.com/memorama/"> <img src=images/facebook.png alt=Facebook> </a> <a target=_blank id=share_tw href="https://twitter.com/home?status=Check%20out%20this%20app%20for%20MYO!%20http://goshmx.com/memorama/"> <img src=images/twitter.png alt=Twitter> </a> </li> </ul> </div>
    </header>

    <?php
    if($login){
    ?>
        <section id=login>
            <a href="<?php echo $instagram->getLoginUrl(); ?>"><img src="images/sign_in.png" alt="Sign in with instagram"></a>
        </section>
    <?php
    }
    else{
        if($cont<9){
            ?>
            <section id=login>
                <p align="center"> You don't have enough photos to play. sorry :(</p>
            </section>
            <?php
        }else{
    ?>
    <section id=partida> <div id=tablero> </div> <div id=status> <div id=message> <p id=oportunities>Oportunities <span>5</span></p> <p id=points>Points <span>0</span></p> <div id=estado></div> </div> <div class="char thinking"></div> </div> </section> <div class=modal id=modal-instructions aria-hidden=true> <div class=modal-dialog> <div class=modal-header> <h2>Instructions</h2> <a href=#close class=btn-close aria-hidden=true>×</a> </div> <div class=modal-body> <p>Memorama using your Instagram account to use your photos as cards.</p> <p><img src=images/instructions.png alt=Instructions></p> <p>Memorama is simple to play , you have 10 opportunities to turn the 6 pairs of cards and win the game .</p> </div> <div class=modal-footer> <a href=#close class=btn>Al right! Let's play!</a> </div> </div> </div> <div class=modal id=modal-about aria-hidden=true> <div class=modal-dialog> <div class=modal-header> <h2>About Memorama</h2> <a href=#close class=btn-close aria-hidden=true>×</a> </div> <div class=modal-body> <p>My name is Gosh hernandez i am a web developer Oaxaca, Mexico.</p> <p>The game "Memorama" was born as an idea for the event <strong>two Swag 2 Furious</strong> organized by <strong>Thalmic Labs</strong> to develop on its product MYO. I hope you enjoy it!</p> <p>Any questions or comments on my twitter: <a target=_blank href=http://twitter.com/gosh_>@gosh_</a> also I leave the code on github if anyone want to improved the project.</p> <p><a href=https://github.com/goshmx/myo-game-contest>https://github.com/goshmx/myo-game-contest</a></p> </div> </div> </div>
    <?php } }?>
</body>
<script>
  (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
  function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
  e=o.createElement(i);r=o.getElementsByTagName(i)[0];
  e.src='//www.google-analytics.com/analytics.js';
  r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
  ga('create','UA-6571165-1');ga('send','pageview');
</script>
<script src=scripts/vendor.js></script> <script src=scripts/main.js></script>  </html>