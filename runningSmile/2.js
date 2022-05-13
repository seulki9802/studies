var canvas = document.getElementById("smile");
var ctx = canvas.getContext("2d");

var gameSpeed = 10;
var userID = 0;
var gameStart = 0;
var gameOver = 0;

var x = canvas.width/8;
var y = canvas.height/2;
var dy = -1;

var dx = +2;

var runningDistance = 0;



var rightPressed = false;

var leftPressed = false;



var smileSize = 20;

var spearSize = canvas.height/10;



var jump = 0;



var stone01_Number = 30;

var stone01_s = [];

var stone01_Size = 20;

var stone02_Size = 30;

var stone03_Size = 40;

var stone01_Speed = +1.5;

var stone02_Speed = +2.5;

var stone03_Speed = +3.5;



for (i = 0; i < stone01_Number; i++) {

  if ( i < 10 ) {

    var stone01_X = getRandomInt(canvas.width*0.5, canvas.width*2);

    var stone01_Y = getRandomInt(spearSize + stone01_Size, canvas.height - spearSize - stone01_Size);

    stone01_s[i] = { x : stone01_X, y : stone01_Y, size : stone01_Size, speed : stone01_Speed};

  }

  else if ( i >= 10 && i < 20) {

    var stone01_X = getRandomInt(canvas.width*2, canvas.width*3);

    var stone01_Y = getRandomInt(spearSize + stone01_Size, canvas.height - spearSize - stone01_Size);

    stone01_s[i] = { x : stone01_X, y : stone01_Y, size : stone02_Size, speed : stone02_Speed};

  }

  else {

    var stone01_X = getRandomInt(canvas.width*3, canvas.width*4);

    var stone01_Y = getRandomInt(spearSize + stone01_Size, canvas.height - spearSize - stone01_Size);

    stone01_s[i] = { x : stone01_X, y : stone01_Y, size : stone03_Size, speed : stone03_Speed};

  }

}



document.addEventListener("keydown", keyDownHandler, false);

document.addEventListener("keyup", keyUpHandler, false);



function keyDownHandler(e) {

  if(e.keyCode == 32) {

    if(gameStart == 0) {

      userID = 'seulki'

      gameStart = 1;

      setInterval(draw, gameSpeed);

    }

    else {

      jump = 1;

    }

  }

  if(e.keyCode == 39) {

    rightPressed = true;

  }

  if(e.keyCode == 37) {

    leftPressed = true;

  }

}



function keyUpHandler(e) {

  if(e.keyCode == 39) {

    rightPressed = false;

  }

  if(e.keyCode == 37) {

    leftPressed = false;

  }

}



function getRandomInt(min, max) {

  min = Math.ceil(min);

  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

}



function beforDraw() {

  ctx.fillRect(canvas.width/2, canvas.height/2, 100, 100);

}



function draw() {

  if (!gameOver) {

    drawGame();

  }

  else {

    drawGameOver();

  }

}



function drawGame() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRunningDistance();

  drawSpear();

  drawSmile();

  moveSmile();

  drawStones();

}



function moveSmile() {

  // up down

  if (jump == 0) { y -= dy * 1.5; }

  else {

    y += dy; jump += 1;

    if (jump == smileSize * 2) { jump = 0 ;}

  }

  if (y <= spearSize + smileSize || y >= canvas.height - spearSize - smileSize) {

    gameOver = 1;

  }



  // right - left (keyboard controll)

  if (rightPressed == true && x <= canvas.width - smileSize) { x += dx; }

  if (leftPressed == true && x >= smileSize) { x -= dx; }



  // colli

  for (i = 0; i < stone01_Number; i++) {

    var disSq = Math.pow(x - stone01_s[i].x, 2) + Math.pow(y - stone01_s[i].y, 2)

    if (Math.sqrt(disSq) < smileSize + stone01_s[i].size) {

      gameOver = 1;

    }

  }

}



function drawSmile() {

  ctx.save();

  ctx.beginPath();

  ctx.arc(x, y, smileSize, 0, Math.PI * 2, true);

  ctx.moveTo(x - smileSize/2 + smileSize/4, y - smileSize/6)

  ctx.arc(x - smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI, true);

  ctx.moveTo(x + smileSize/2 + smileSize/4, y - smileSize/6)

  ctx.arc(x + smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI, true);

  ctx.moveTo(x + smileSize/3, y + smileSize/4)

  ctx.arc(x, y + smileSize/4, smileSize/3, 0, Math.PI, false);

  ctx.lineTo(x + smileSize/3, y + smileSize/4);

  ctx.stroke();

  ctx.closePath();

  ctx.restore();

}



function drawSpear() {

  ctx.save();

  ctx.fillStyle = "red";

  ctx.strokeStyle = "blue";

  ctx.beginPath();

  ctx.moveTo(0, 0);

  var spearNumber = 40 * 2;

  for (i = 0; i <= spearNumber; i ++) {

    if (i % 2 == 0) { ctx.lineTo(canvas.width/spearNumber * i, 0); }

    else { ctx.lineTo(canvas.width/spearNumber * i, spearSize); }

  }

  ctx.moveTo(0, canvas.height);

  for (i = 0; i <= spearNumber; i ++) {

    if (i % 2 == 0) { ctx.lineTo(canvas.width/spearNumber * i, canvas.height); }

    else { ctx.lineTo(canvas.width/spearNumber * i, canvas.height - spearSize); }

  }

  ctx.fill();

  ctx.stroke();

  ctx.closePath();

  ctx.restore();

}



function drawStones() {

  ctx.save();

  ctx.beginPath();

  for (i = 0; i < stone01_Number; i++) {

    ctx.moveTo(stone01_s[i].x, stone01_s[i].y)

    ctx.arc(stone01_s[i].x, stone01_s[i].y, stone01_s[i].size, 0, Math.PI * 2, true);

    stone01_s[i].x -= stone01_s[i].speed;

  }

  ctx.stroke();

  ctx.restore();

}



function drawRunningDistance() {

  runningDistance += 1;

  ctx.save();

  ctx.font = "50px Arial";

  ctx.fillStyle = "gray";

  ctx.textAlign = "center";

  ctx.fillText(runningDistance + "m", canvas.width/2, canvas.height/2)

  ctx.restore();

}



function drawGameOver() {

  ctx.fillRect(canvas.width/2, canvas.height/2, 100, 100);

}



beforDraw();
