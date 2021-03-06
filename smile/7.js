var canvas = document.getElementById("smile");
var ctx = canvas.getContext("2d");

var mainFoodNumber = 10;
var mainFoodSize = 40;
var mainFoods = [];

var junckFoodNumber = 0;
var junckFoodSize = 30;
var junckFoods = [];

var x = 75;
var y = 75;
var start_dx = 3;
var start_dy = 3;

var rightPressed = true;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var smileSize = 20;
var eat = 0;
var eatMainFoodNumber = 0;
var eatTime = new Date();

var gameGauge = 100;
var gameGaugeSize = canvas.height/10;

var start = 0;
var over = 0;
var stage = 0;

var score = 0;

var hasInput = 0;
var nick = 'unknown';

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("click", clickHandler, false);

function clickHandler(){
  console.log("!?");
}
function setup(speed) {
  dx = start_dx * speed;
  dy = start_dy * speed;
  eatMainFoodNumber = 0;
  gameGauge = 100;
  for (i = 0; i < mainFoodNumber; i++) {
    var x = getRandomInt(canvas.width * 0.1, canvas.width * 0.9);
    var y = getRandomInt(canvas.height/8, canvas.height * 0.9);
    mainFoods[i] = { x : x, y : y, status : 1};
  }
  for (i = 0; i < junckFoodNumber; i++) {
    var x = getRandomInt(canvas.width * 0.1, canvas.width * 0.9);
    var y = getRandomInt(canvas.height/8, canvas.height * 0.9);
    junckFoods[i] = { x : x, y : y, status : 1};
  }

}

function stageSet() {
  if (stage <= 2) {
    setup(stage);
  }
  if (stage >= 3) {
    junckFoodNumber = Math.floor(stage * 1.5 );
    setup(2)
  }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
      rightPressed = true;
      leftPressed = false;
      upPressed = false;
      downPressed = false;
    }
    if(e.keyCode == 37) {
      rightPressed = false
      leftPressed = true;
      upPressed = false;
      downPressed = false;
    }
    if(e.keyCode == 38) {
      rightPressed = false;
      leftPressed = false;
      upPressed = true;
      downPressed = false;
    }
    if(e.keyCode == 40) {
      rightPressed = false;
      leftPressed = false;
      upPressed = false;
      downPressed = true;
    }
    if(e.keyCode == 13) {
      if(hasInput == 0) {

        hasInput = 1;
        var a = document.getElementById('nick');
        nick = a.value;
        a.remove();

        setInterval(draw, 10);
      }

      if(eatMainFoodNumber == mainFoodNumber || start == 0 || over == 1) {
        if(over == 1) {
          stage = 0;
          start = 0;
          over = 0;
          score = 0;
        }
        else{
          stage += 1;
          start = 1;
        }
        stageSet()
      }
    }
}

function moveSmile() {
  if (rightPressed == true) {
    x += dx;
  }
  if (leftPressed == true) {
    x -= dx;
  }
  if (upPressed == true) {
    y -= dy;
  }
  if (downPressed == true) {
    y += dy;
  }
  if (x > canvas.width - smileSize) {
    rightPressed = false;
    leftPressed = true;
  }
  if (x < smileSize) {
    leftPressed = false;
    rightPressed = true;
  }
  if (y > canvas.height - smileSize) {
    downPressed = false;
    upPressed = true;
  }
  if (y < smileSize + gameGaugeSize) {
    upPressed = false;
    downPressed = true;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //???????????? ??????, ???????????? ??????
}

function colli_mainFood() {
  for (i = 0; i < mainFoodNumber; i++) {
    var fx = mainFoods[i].x + mainFoodSize/2; //figure x (main food x)
    var fy = mainFoods[i].y + mainFoodSize/2;
    var is = Math.sqrt(Math.pow(x - fx, 2) + Math.pow(y - fy, 2));
    if (is <= mainFoodSize/3 + smileSize && mainFoods[i].status == 1) {
      eat = 1;
      eatMainFoodNumber += 1;
      score += 5;
      mainFoods[i].status = 0;
      eatTime = new Date();
      gameGauge += 30;
      if (gameGauge >= 100) {
        gameGauge = 100;
      }
    }
  }
}

function colli_junckFood() {
  for (i = 0; i < junckFoodNumber; i++) {
    var fx = junckFoods[i].x + junckFoodSize/2; //figure x (jucnk food x)
    var fy = junckFoods[i].y + junckFoodSize/2;
    var is = Math.sqrt(Math.pow(x - fx, 2) + Math.pow(y - fy, 2));
    if (is <= junckFoodSize/4 + smileSize && junckFoods[i].status == 1) {
      // eat = 1;
      // eatMainFoodNumber += 1;
      score -= 3;
      junckFoods[i].status = 0;
      // eatTime = new Date();
      gameGauge -= 30;
      // if (gameGauge >= 100) {
      //   gameGauge = 100;
    }
  }
}

function drawMainFood() {
  for ( i = 0; i < mainFoodNumber; i ++) {
    if (mainFoods[i].status == 1) {
      var mainFoodX = mainFoods[i].x;
      var mainFoodY = mainFoods[i].y;
      ctx.drawImage(document.getElementById("chicken"),
                    mainFoodX, mainFoodY, mainFoodSize, mainFoodSize);
      // ctx.beginPath();
      // ctx.arc(mainFoodX + mainFoodSize/2 , mainFoodY + mainFoodSize/2, mainFoodSize, 0, Math.PI * 2, true); // head
      // ctx.stroke();
    }
  }
}

function drawJunckFood() {
  for ( i = 0; i < junckFoodNumber; i ++) {
    if (junckFoods[i].status == 1) {
      var junckFoodX = junckFoods[i].x;
      var junckFoodY = junckFoods[i].y;
      ctx.drawImage(document.getElementById("sigmchi"),
                    junckFoodX, junckFoodY, junckFoodSize, junckFoodSize);
      // ctx.beginPath();
      // ctx.arc(junckFoodX + junckFoodSize/2, junckFoodY + junckFoodSize/2, junckFoodSize, 0, Math.PI * 2, true); // head
      // ctx.stroke();
    }
  }
}

function drawSmile() {
  ctx.beginPath();
  ctx.arc(x, y, smileSize, 0, Math.PI * 2, true);
  ctx.save();
  for (i = 0; i < gameGauge; i++) {
    ctx.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
    ctx.fill();
  }
  ctx.restore();
  ctx.moveTo(x - smileSize/2 + smileSize/4, y - smileSize/6)
  if (eat == 0) {
    ctx.arc(x - smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI * 2, true);
    ctx.moveTo(x + smileSize/2 + smileSize/4, y - smileSize/6)
    ctx.arc(x + smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI * 2, true);
  }
  else {
    ctx.arc(x - smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI, true);
    ctx.moveTo(x + smileSize/2 + smileSize/4, y - smileSize/6)
    ctx.arc(x + smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI, true);
  }
  ctx.moveTo(x + smileSize/3, y + smileSize/4)
  ctx.arc(x, y + smileSize/4, smileSize/3, 0, Math.PI, false);
  ctx.lineTo(x + smileSize/3, y + smileSize/4);
  ctx.stroke();
}

function drawGuage() {
  ctx.save();
  ctx.beginPath();
  for (i = 0; i < gameGauge; i++) {
    // ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
    ctx.fillRect(i * canvas.width/100, 0, canvas.width/100, gameGaugeSize);
  }
  gameGauge -= 0.3;
  ctx.restore();
}

function drawScroe() {
  ctx.font = "50px Arial";
  ctx.fillStyle = "gray";
  ctx.textAlign = "center";
  ctx.fillText(nick, canvas.width/2, canvas.height/2.2)
  ctx.fillText("score:" + score, canvas.width/2, canvas.height/1.8)
}

function gameStart() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("START", canvas.width/2, canvas.height/2.2);
  ctx.fillText("Enter", canvas.width/2, canvas.height/1.8);
}

function gameOver() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.fillRect(canvas.width/5 * 2, canvas.height/10 * 8.5, canvas.width/5, canvas.height/10.3);
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2.5);
  ctx.fillText("Your Level: " + stage, canvas.width/2, canvas.height/2.1)
  ctx.fillText("Your score :" + score, canvas.width/2, canvas.height/1.85);
  ctx.fillText("Restart: enter", canvas.width/2, canvas.height/1.65)
  ctx.fillText("click", canvas.width/4 * 2, canvas.height/10 * 9.1)
  ctx.fillStyle = "black";
  ctx.fillText("Click to update the record", canvas.width/4 * 2, canvas.height/10 * 8)
  over = 1;
  junckFoodNumber = 0;
  ctx.restore();
}

function gameComplete() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  var next = stage + 1
  ctx.fillText("Next Level: " + next, canvas.width/2, canvas.height/2.3)
  ctx.fillText("Your score :" + score, canvas.width/2, canvas.height/1.9);
  ctx.fillText("Enter", canvas.width/2, canvas.height/1.6)
}

function eat_mainFood() {
  if (new Date() - eatTime > 250) { //???????????? 2.5??? ????????????
    eat = 0; //???????????? ?????????
  }
}

function gaming() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // addInput(100, 100);
  drawScroe();
  drawMainFood();
  drawJunckFood();
  drawSmile();
  drawGuage();
  moveSmile();
  colli_mainFood();
  colli_junckFood();
  eat_mainFood();
}

function draw() {
  if (start == 0) {
    gameStart()
  }
  else if (eatMainFoodNumber == mainFoodNumber) {
    gameComplete();
  }
  else if (gameGauge <= 0) {
    gameOver();
  }
  else {
    gaming();
  }
}

function addInput() {
  var input = document.createElement('input');

  input.id = 'nick';
  input.type = 'text';
  input.style.position = 'fixed';
  input.style.left = canvas.width/2 + 'px';
  input.style.top = canvas.height/2 + 'px';

  document.body.appendChild(input);

  // input.focus();
}

function drawLogIn() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Your nickname:", canvas.width/2, canvas.height/2.2);
  addInput();
}

drawLogIn();

// setInterval(draw, 10);

// addInput(100, 100)
