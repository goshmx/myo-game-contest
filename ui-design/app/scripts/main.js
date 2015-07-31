/* jshint devel:true */

var numImagenes = 8;
var perder = 10;

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
    $('#oportunities span').html(perder);
    return false;
  });

  Myo.connect();

  Myo.on('status', function(data){
    //console.log(data);
  });

  Myo.on('pose', function(pose){
   //console.log(pose);
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
  $('#points span').html('0');
  $('#oportunities span').html(perder);
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
    restaura_char('acierto');
    setTimeout("restaura_char('thinking')",1500);
    gi1.onclick=null;
    gi2.onclick=null;
    $('#oportunities span').html(perder-intentos);
    acrtos++;
    puntos = puntos+10;
    $('#points span').html(puntos);
    if(acrtos == cant){
      finJuego('gana');
      restaura_char('gano');
      gana = true;
    }
    cont = 0;
  }
  else{
    reset_char();
    asigna_char('fallo');
    setTimeout("restaura_char('thinking')",1500);
    setTimeout("restaura()",1500);
  }

}
function restaura()
{
  gi1.src = "images/card.png" ; gi1 =""
  setTimeout('gi2.src = "images/card.png";gi2=""',200)
  cont = 0;
  intentos ++;
  $('#oportunities span').html(perder-intentos);
  if(intentos >= perder){
    cont = 4;
    finJuego('pierde');
    restaura_char('perdio');
    perdio = true;
  }
}
function finJuego(cual) {
  if(cual == 'pierde'){
    $('#estado').html('Your ' + perder + '  chances were completed<br> You lose! <a id="again" href="#">Play again!</a>');
    cont='perdio';
  }
  if(cual == 'gana'){
    $('#estado').html('You won! Congrats!<br> <a id="again" href="#">Play again!</a>');
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

function reset_char(){
  $('.char').removeClass('thinking').removeClass('acierto').removeClass('fallo').removeClass('perdio').removeClass('gano');
}

function asigna_char(mood){
  $('.char').addClass(mood);
}

function restaura_char(mood){
  reset_char();
  asigna_char(mood);
}
