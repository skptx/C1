function elementPage (selector, context = document){
  this.element = context.querySelector(selector);
  return this
}

elementPage.prototype.click = function(fn){
  this.element.addEventListener('click', fn);
  return this;
}

elementPage.prototype.text = function(text){
  this.element.textContent = text;
  return this;
}

elementPage.prototype.html = function(html){
  this.element.innerHTML = html;
  return this;
}

elementPage.prototype.display = function(s){
  this.element.style.display = s;
  return this;
}

elementPage.prototype.value = function(s){
  this.element.value = s;
  return this;
}


const $ = (e) => new elementPage(e);
let countSec = 0;
let countMin = 0;
let work = false;
let stop = false;

const updateText = () => { 
  $('.minutes').html((0 + String(countMin)).slice(-2));
  $('.seconds').html((0 + String(countSec)).slice(-2));
}

updateText();

const countDown = () => { 
  work = true;
  $('.timer').display('none');
  let total = countSec + countMin * 60;
  const timeinterval = setTimeout(countDown, 1000);
  if (stop) {
    clearInterval(timeinterval);
    stop = false;
    work = false;
  }
  if (total <= 0) {
    clearInterval(timeinterval);
    $('.countdown').display('none');
    $('.message').html('<p>I am done...</p>');
    work = false;
  }
  if(countSec > 0) countSec--;
  else{
    countSec = 59;
    countMin--;
  } 
  updateText();
}

function plus (seconds) {
  if (countSec + seconds > 59) {
    countSec=countSec + seconds - 60;
    if (countMin == 59) countMin = 0;
    else countMin++;
  }
  else {
   countSec=countSec + seconds; 
  }
}

function minus (seconds) {
  if (countSec - seconds < 0) {
    countSec=countSec - seconds + 60;
    if (countMin == 0) {
      countMin = 59;
    }
    else {
      countMin--;
    }
  }
  else {
   countSec=countSec - seconds; 
  }
}


function onClickPlusMinutes () {
  if (!work) {
    plus(60);
    updateText();
  }
}
function onClickPlusSeconds () {
  if (!work) {
    plus(1);
    updateText();
  }
}
function onClickMinusMinutes () {
  if (!work) {
    minus(60);
    updateText();
  }
}
function onClickMinusSeconds () {
  if (!work) {
    minus(1);
    updateText();
  }
}
function onClickReset () {
  if (!work) {
    countSec = 0;
    countMin = 0;
    $('.countdown').display('');
    $('.message').html('');
    $('.timer').display('');
    $('#Start').value("Start"); 
    updateText();
  }
}
function onClickStart () {
  if (!work) {
    stop = false;
    countDown();
    $('#Start').value("Stop");
  }
  else {
    stop = true;
    $('#Start').value("Start"); 
  }
}



$('#minusMinutes').click(onClickMinusMinutes);
$('#minusSeconds').click(onClickMinusSeconds);
$('#plusMinutes').click(onClickPlusMinutes);
$('#plusSeconds').click(onClickPlusSeconds);
$('#Start').click(onClickStart);
$('#Reset').click(onClickReset);


/*

const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const start = document.querySelector('.start');


let countSec = 0;
let countMin = 0;

const updateText = () =>{ 
  minutes.innerHTML = (0 + String(countMin)).slice(-2);
  seconds.innerHTML = (0 + String(countSec)).slice(-2);
}
updateText();

const countDown = () => { 
  let total = countSec + countMin * 60;
  const timeinterval = setTimeout(countDown, 1000);
  if (total <= 0) {
    clearInterval(timeinterval);
    timer.style.display = 'none';
    message.innerHTML = '<p>I am done...</p>'
  }
  if(countSec > 0) countSec--;
  else{
    countSec = 59;
    countMin--;
  } 
  updateText();
}

plus.onclick = () =>{
  if(countSec < 59) ++countSec;
  else{
    countSec = 0;
    ++countMin;
  }
  updateText()
}

minus.onclick = () =>{
  if(countMin <= 0 && countSec===0){
    countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) --countSec;
  else{
    countSec = 59;
    --countMin;
  }
  updateText();
}

start.onclick = () => {
    countDown();  
}
*/
