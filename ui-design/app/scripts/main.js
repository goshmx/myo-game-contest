/* jshint devel:true */

var instaimage=[];
instaimage[0]='https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s320x320/e15/11336075_1622561891337157_1996796769_n.jpg';
instaimage[1]='https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11356983_843533335754059_1045354276_n.jpg';
instaimage[2]='https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s320x320/e15/11372183_887618871315083_1707412315_n.jpg';
instaimage[3]='https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/10684170_484833515026854_898775870_n.jpg';
instaimage[4]='https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s320x320/e15/11337152_1455923291375386_1022945904_n.jpg';
instaimage[5]='https://scontent.cdninstagram.com/hphotos-xaf1/l/t51.2885-15/s320x320/e15/11377890_1602862076631520_853791531_n.jpg';
instaimage[6]='https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11255652_254563358047407_1888300431_n.jpg';
instaimage[7]='https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/s320x320/e15/11143044_1634796146739794_2140026999_n.jpg';
instaimage[8]='https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/s320x320/e15/11191448_831804936901229_1029293629_n.jpg';

var numImagenes = 8;
var perder = 5;

var nums = [];
var cant = 6;
var acrtos = 0;
var intentos = 0;
var puntos = 0;
gana = false;
perdio = false;

var numero = 0;

var lista = [];

var imagenes = [];

cont = 0;
var gi1,gi2;
var m;
var ubicacion = 1;

$(document).ready(function(){

  init();

  $('#tablero').on('click','.img-card',function(){
    gira(this,$(this).attr('id'));
  });

  $('#estado').on('click','#again',function(){
    reinicializa();
    init();
    $('#estado').html('');
    $('#points span').html('0');
    $('#oportunities span').html('5');
    return false;
  });

  Myo.connect();

  Myo.on('status', function(data){
    console.log(data);
  });

  Myo.on('pose', function(pose){
   console.log(pose);
    if(pose == 'wave_in'){
      siguiente();
    }
    if(pose == 'wave_out'){
      anterior();
    }
    if(pose == 'fingers_spread'){
      selecciona();
    }
  });

});


function init(){
  nums[0] = numeroRandom();

  for(m=1;m<=(cant-1);m++){
    nums[m] =  comprueba(numeroRandom());
  }

  largo = nums.length;

  for(var w = 0; w < largo ; w++){
    nums[largo + w] = nums[w];
  }

  for(var q=0; q < nums.length; q++){
    if(q == nums.length-1){
      for(var e=0;e < nums.length; e++){
        if(nums[e] != null){
          lista[q] = nums[e];
          break;
        }
      }
    }
    else{
      numerin = Math.floor(Math.random() * nums.length-1);
      numerin = comprueba2(numerin);
      lista[q] = nums[numero];
      nums[numero] = null;
    }
  }

  for(var n=0;n<lista.length;n++){
    imagenes[n] = new Image();
    imagencilla = instaimage[lista[n]];
    imagenes[n].src = imagencilla;
  }
  s = 1;
  generaTabla();
  $('#table-cards:first-child tr:first-child td:first-child img').addClass('selected');
}

function reinicializa(){
  nums = [];
  cant = 6;
  acrtos = 0;
  intentos = 0;
  puntos = 0;
  gana = false;
  perdio = false;
  numero = 0;
  lista = [];
  imagenes = [];
  cont = 0;
  ubicacion =1;
}

function generaTabla(){
  var html = '<table id="table-cards" width="100" align="center">';
  html+='<tr align="center">';
  for(p=1; p<=nums.length;p++){
    if(s > 4){
      html+='</tr><tr>';
      s=1;
    }
    html+='<td id="' + lista[p-1] + '"><a href="#" onclick="this.blur();return false">';
    html+='<img class="img-card elem'+p+'" id="' + lista[p-1] + '" src="images/card.png" width="150">';
    html+='</a></td>';
    s++;
  }
  html+='</table>';
  $('#tablero').html(html);
}

function gira(cual,carta){
  if(perdio == true){
    document.formu.visor.value="Juego Finalizado"
    setTimeout('document.location.reload()',2000)
  }
  if(cual != gi1){
    cont++;
  }
  if(cont < 3){
    cual.src = instaimage[carta];
    if(cont==1){gi1 = cual;}
    else{gi2 = cual; comp()}
  }
}
function comp(){
  if(gi1.src == gi2.src){
    gi1.onclick=null;
    gi2.onclick=null;
    $('#oportunities span').html(intentos);
    acrtos++;
    puntos = puntos+10;
    $('#points span').html(puntos);
    if(acrtos == cant){
      finJuego('gana');
      gana = true;
    }
    cont = 0;
  }
  else{
    setTimeout("restaura()",1500);
  }

}
function restaura()
{
  gi1.src = "images/card.png" ; gi1 =""
  setTimeout('gi2.src = "images/card.png";gi2=""',200)
  cont = 0;
  intentos ++;
  $('#oportunities span').html(5-intentos);
  if(intentos >= perder){
    cont = 4;
    finJuego('pierde');
    perdio = true;
  }
}
function finJuego(cual) {
  if(cual == 'pierde'){
    $('#estado').html('Agotaste tus ' + perder + ' intentos<br> Perdiste  :-( <a id="again" href="#">Play again!</a>');
    cont='perdio';
  }
  if(cual == 'gana'){
    $('#estado').html('Ganaste felicidades!<br> <a id="again" href="#">Play again!</a>');
    cont='gano';
  }
}

function numeroRandom(){
  var num = Math.ceil(Math.random() *numImagenes);
  return num;
}

function comprueba(nume){
  var repe = false;
  for(var t=0;t<nums.length;t++){
    if(nume == nums[t]){
      repe = true;
      break;
    }
  }
  if(repe == false){
    return nume;
  }
  else{
    m--;
    comprueba(numeroRandom());
  }
}

function comprueba2(numerito){
  if(nums[numerito] == null){
    if(numerito == nums.length-1){
      numerito = 0;
      numerito2 = numerito;
      comprueba2(numerito2);
    }
    else{
      numerito += 1;
      numerito2 = numerito;
      comprueba2(numerito2);
    }
  }
  else{
    numero = numerito;
    return numerito;
  }
}

function siguiente(){
  if(ubicacion<(cant*2)){
    ubicacion++;
    $('#table-cards tr td a img').removeClass('selected');
    $('.elem'+ubicacion).addClass('selected');
  }
}

function anterior(){
  if(ubicacion>1){
    ubicacion--;
    $('#table-cards tr td a img').removeClass('selected');
    $('.elem'+ubicacion).addClass('selected');
  }
}

function selecciona(){
  var elemento = $('.elem'+ubicacion)[0];
  gira(elemento,$('.elem'+ubicacion).attr('id'));
}
