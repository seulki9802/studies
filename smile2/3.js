var canvas = document.getElementById("smile");
var ctx = canvas.getContext("2d");

var mainFoodNumber = 10;
var mainFoods = [];
for (i = 0; i < mainFoodNumber; i++) {
  var x = getRandomInt(0, canvas.width);
  var y = getRandomInt(canvas.height/8, canvas.height);
  mainFoods[i] = { x : x, y : y, status : 1};
}

var x = 75;
var y = 75;
var start_dx = 3;
var start_dy = 3;

var rightPressed = false;
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

document.addEventListener("keydown", keyDownHandler, false);

function stageSet() {
  dx = start_dx * stage
  dy = start_dy * stage
  eatMainFoodNumber = 0;
  gameGauge = 100;
  for (i = 0; i < mainFoodNumber; i++) {
    var x = getRandomInt(0, canvas.width);
    var y = getRandomInt(canvas.height/8, canvas.height);
    mainFoods[i] = { x : x, y : y, status : 1};
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
      if(eatMainFoodNumber == mainFoodNumber || start == 0 || over == 1) {
        if(over == 1) {
          stage = 0;
          start = 0;
          over = 0;
          score = 0;
        }else{
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
    var rx = mainFoods[i].x + 7.5;
    var ry = mainFoods[i].y + 2;
    var is = Math.sqrt(Math.pow(x - rx, 2) + Math.pow(y - ry, 2));
    if (is <= 7.5 + 20 && mainFoods[i].status == 1) {
      eat = 1;
      eatMainFoodNumber += 1;
      score += 1;
      mainFoods[i].status = 0;
      eatTime = new Date();
      gameGauge += 30;
      if (gameGauge >= 100) {
        gameGauge = 100;
      }
    }
  }
}

function drawMainFood() {
  for ( i = 0; i < mainFoodNumber; i ++) {
    if (mainFoods[i].status == 1) {
      var mainFoodX = mainFoods[i].x;
      var mainFoodY = mainFoods[i].y;
      ctx.beginPath();
      ctx.moveTo(mainFoodX, mainFoodY); //
      ctx.lineTo(mainFoodX + 15, mainFoodY);
      ctx.lineTo(mainFoodX + 3, mainFoodY + 9);
      ctx.lineTo(mainFoodX + 7.5, mainFoodY - 5);
      ctx.lineTo(mainFoodX + 12, mainFoodY + 9);
      ctx.lineTo(mainFoodX, mainFoodY);
      // ctx.arc(mainFoodX + 7.5, mainFoodY + 2, 7.5, 0, Math.PI * 2, true); // head
      ctx.stroke();
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
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(score, canvas.width/2, canvas.height/2)
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
  ctx.fillText("START", canvas.width/2, canvas.height/2.2)
  ctx.fillText("Enter", canvas.width/2, canvas.height/1.8)
}

function gameOver() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("THE END", canvas.width/2, canvas.height/2.2)
  ctx.fillText("Restart: Enter", canvas.width/2, canvas.height/1.8)
  over = 1;
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
  ctx.fillText("Next Level", canvas.width/2, canvas.height/2.3)
  ctx.fillText(score, canvas.width/2, canvas.height/1.9);
  ctx.fillText("Enter", canvas.width/2, canvas.height/1.6)
}

function eat_mainFood() {
  if (new Date() - eatTime > 250) { //???????????? 2.5??? ????????????
    eat = 0; //???????????? ?????????
  }
}

function gaming() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScroe();
  drawMainFood();
  drawSmile();
  drawGuage();
  moveSmile();
  colli_mainFood();
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

setInterval(draw, 10);
