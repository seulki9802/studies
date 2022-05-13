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

var runningTime = 0;

var old = 0;

var now = 0;



var rightPressed = false;

var leftPressed = false;



var smileSize = 20;

var spearSize = canvas.height/10;



var jump = 0;



var stone01Size = 10;

var stone01Speed = 3;



document.addEventListener("keydown", keyDownHandler, false);

document.addEventListener("keyup", keyUpHandler, false);



var stone01s = [];

var stone02s = [];

var stone03s = []

function stone(stone0Xs, size, speed, time) {

  //create

  now = Math.floor(runningTime);

  var dt = now - old;

  console.log(dt, time, dt % time);

  if( dt != 0 && dt % time == 0) {

    // console.log("??");

    var s1x = getRandomInt(canvas.width, canvas.width * 1.3);

    var s1y = getRandomInt(0, canvas.height);

    console.log(stone0Xs[0]);

    stone0Xs[stone0Xs.length] = { x: s1x, y: s1y };

  }

  //draw

  ctx.save();

  ctx.beginPath();

  for(i in stone0Xs) {

    var s1x = stone0Xs[i].x;

    var s1y = stone0Xs[i].y;

    ctx.moveTo(s1x, s1y);

    ctx.arc(s1x, s1y, size, 0, Math.PI * 2, true);

    stone0Xs[i].x -= speed;

  }

  ctx.stroke();

  ctx.closePath();

  ctx.restore();

}



function stone01() {

  now = Math.floor(runningTime);

  if( now - old ) {

    var s1x = getRandomInt(canvas.width, canvas.width * 1.3);

    var s1y = getRandomInt(0, canvas.height);

    stone01s[old] = { x: s1x, y: s1y };

    old += 1;

  }

  drawStone01();

}



function drawStone01() {

  ctx.save();

  ctx.beginPath();

  for(i in stone01s) {

    var s1x = stone01s[i].x;

    var s1y = stone01s[i].y;

    ctx.moveTo(s1x, s1y);

    ctx.arc(s1x, s1y, stone01Size, 0, Math.PI * 2, true);

    stone01s[i].x -= stone01Speed;

  }

  ctx.stroke();

  ctx.closePath();

  ctx.restore();

}



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

  drawRunningTime();

  drawSpear();

  drawSmile();

  moveSmile();

  // stone(stone01s, 10, 10);

  // stone(stone02s, 60, 4, 1);

  stone(stone01s, 30, 8, 2);

}



function moveSmile() {

  // up down

  if (jump == 0) { y -= dy * 1.5; }

  else {

    y += dy; jump += 1;

    if (jump == smileSize * 2) { jump = 0 ;}

  }

  if (y <= spearSize + smileSize || y >= canvas.height - spearSize - smileSize) {

    // gameOver = 1;

  }



  // right - left (keyboard controll)

  if (rightPressed == true && x <= canvas.width - smileSize) { x += dx; }

  if (leftPressed == true && x >= smileSize) { x -= dx; }



  //colli

  for (i in stone01s) {

    var dis = Math.sqrt((stone01s[i].x - x)**2 + (stone01s[i].y - y)**2)

    if (dis < smileSize + stone01Size) {

      gameOver = 1;

      drawGameOver();

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



function drawRunningDistance() {

  runningDistance += 1;

  ctx.save();

  ctx.font = "50px Arial";

  ctx.fillStyle = "gray";

  ctx.textAlign = "center";

  ctx.fillText(runningDistance + "m", canvas.width/2, canvas.height/2)

  ctx.restore();

}



function drawRunningTime() {

  runningTime += 10/1000;

  ctx.save();

  ctx.font = "50px Arial";

  ctx.fillStyle = "gray";

  ctx.textAlign = "center";

  ctx.fillText(runningTime + "sec", canvas.width/2, canvas.height/2)

  ctx.restore();

}



function drawGameOver() {

  ctx.fillRect(canvas.width/2, canvas.height/2, 100, 100);

}



beforDraw();

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
var runningTime = 0;
var old = 0;
var now = 0;

var rightPressed = false;
var leftPressed = false;

var smileSize = 20;
var spearSize = canvas.height/10;

var jump = 0;

var stone01Size = 10;
var stone01Speed = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var stone01s = [];
var stone02s = [];
var stone03s = []
function stone(stone0Xs, size, speed, time) {
  //create
  now = Math.floor(runningTime);
  var dt = now - old;
  console.log(dt, time, dt % time);
  if( dt != 0 && dt % time == 0) {
    // console.log("??");
    var s1x = getRandomInt(canvas.width, canvas.width * 1.3);
    var s1y = getRandomInt(0, canvas.height);
    console.log(stone0Xs[0]);
    stone0Xs[stone0Xs.length] = { x: s1x, y: s1y };
  }
  //draw
  ctx.save();
  ctx.beginPath();
  for(i in stone0Xs) {
    var s1x = stone0Xs[i].x;
    var s1y = stone0Xs[i].y;
    ctx.moveTo(s1x, s1y);
    ctx.arc(s1x, s1y, size, 0, Math.PI * 2, true);
    stone0Xs[i].x -= speed;
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

function stone01() {
  now = Math.floor(runningTime);
  if( now - old ) {
    var s1x = getRandomInt(canvas.width, canvas.width * 1.3);
    var s1y = getRandomInt(0, canvas.height);
    stone01s[old] = { x: s1x, y: s1y };
    old += 1;
  }
  drawStone01();
}

function drawStone01() {
  ctx.save();
  ctx.beginPath();
  for(i in stone01s) {
    var s1x = stone01s[i].x;
    var s1y = stone01s[i].y;
    ctx.moveTo(s1x, s1y);
    ctx.arc(s1x, s1y, stone01Size, 0, Math.PI * 2, true);
    stone01s[i].x -= stone01Speed;
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

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
  drawRunningTime();
  drawSpear();
  drawSmile();
  moveSmile();
  // stone(stone01s, 10, 10);
  // stone(stone02s, 60, 4, 1);
  stone(stone01s, 30, 8, 2);
}

function moveSmile() {
  // up down
  if (jump == 0) { y -= dy * 1.5; }
  else {
    y += dy; jump += 1;
    if (jump == smileSize * 2) { jump = 0 ;}
  }
  if (y <= spearSize + smileSize || y >= canvas.height - spearSize - smileSize) {
    // gameOver = 1;
  }

  // right - left (keyboard controll)
  if (rightPressed == true && x <= canvas.width - smileSize) { x += dx; }
  if (leftPressed == true && x >= smileSize) { x -= dx; }

  //colli
  for (i in stone01s) {
    var dis = Math.sqrt((stone01s[i].x - x)**2 + (stone01s[i].y - y)**2)
    if (dis < smileSize + stone01Size) {
      gameOver = 1;
      drawGameOver();
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

function drawRunningDistance() {
  runningDistance += 1;
  ctx.save();
  ctx.font = "50px Arial";
  ctx.fillStyle = "gray";
  ctx.textAlign = "center";
  ctx.fillText(runningDistance + "m", canvas.width/2, canvas.height/2)
  ctx.restore();
}

function drawRunningTime() {
  runningTime += 10/1000;
  ctx.save();
  ctx.font = "50px Arial";
  ctx.fillStyle = "gray";
  ctx.textAlign = "center";
  ctx.fillText(runningTime + "sec", canvas.var canvas = document.getElementById("smile"));
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
var runningTime = 0;
var old = 0;
var now = 0;

var rightPressed = false;
var leftPressed = false;

var smileSize = 20;
var spearSize = canvas.height/10;

var jump = 0;

var stone01Size = 10;
var stone01Speed = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var stone01s = [];
var stone02s = [];
var stone03s = []
function stone(stone0Xs, size, speed, time) {
  //create
  now = Math.floor(runningTime);
  var dt = now - old;
  console.log(dt, time, dt % time);
  if( dt != 0 && dt % time == 0) {
    // console.log("??");
    var s1x = getRandomInt(canvas.width, canvas.width * 1.3);
    var s1y = getRandomInt(0, canvas.height);
    console.log(stone0Xs[0]);
    stone0Xs[stone0Xs.length] = { x: s1x, y: s1y };
  }
  //draw
  ctx.save();
  ctx.beginPath();
  for(i in stone0Xs) {
    var s1x = stone0Xs[i].x;
    var s1y = stone0Xs[i].y;
    ctx.moveTo(s1x, s1y);
    ctx.arc(s1x, s1y, size, 0, Math.PI * 2, true);
    stone0Xs[i].x -= speed;
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

function stone01() {
  now = Math.floor(runningTime);
  if( now - old ) {
    var s1x = getRandomInt(canvas.width, canvas.width * 1.3);
    var s1y = getRandomInt(0, canvas.height);
    stone01s[old] = { x: s1x, y: s1y };
    old += 1;
  }
  drawStone01();
}

function drawStone01() {
  ctx.save();
  ctx.beginPath();
  for(i in stone01s) {
    var s1x = stone01s[i].x;
    var s1y = stone01s[i].y;
    ctx.moveTo(s1x, s1y);
    ctx.arc(s1x, s1y, stone01Size, 0, Math.PI * 2, true);
    stone01s[i].x -= stone01Speed;
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

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
  drawRunningTime();
  drawSpear();
  drawSmile();
  moveSmile();
  // stone(stone01s, 10, 10);
  // stone(stone02s, 60, 4, 1);
  stone(stone01s, 30, 8, 2);
}

function moveSmile() {
  // up down
  if (jump == 0) { y -= dy * 1.5; }
  else {
    y += dy; jump += 1;
    if (jump == smileSize * 2) { jump = 0 ;}
  }
  if (y <= spearSize + smileSize || y >= canvas.height - spearSize - smileSize) {
    // gameOver = 1;
  }

  // right - left (keyboard controll)
  if (rightPressed == true && x <= canvas.width - smileSize) { x += dx; }
  if (leftPressed == true && x >= smileSize) { x -= dx; }

  //colli
  for (i in stone01s) {
    var dis = Math.sqrt((stone01s[i].x - x)**2 + (stone01s[i].y - y)**2)
    if (dis < smileSize + stone01Size) {
      gameOver = 1;
      drawGameOver();
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

function drawRunningDistance() {
  runningDistance += 1;
  ctx.save();
  ctx.font = "50px Arial";
  ctx.fillStyle = "gray";
  ctx.textAlign = "center";
  ctx.fillText(runningDistance + "m", canvas.width/2, canvas.height/2)
  ctx.restore();
}

function drawRunningTime() {
  runningTime += 10/1000;
  ctx.save();
  ctx.font = "50px Arial";
  ctx.fillStyle = "gray";
  ctx.textAlign = "center";
  ctx.fillText(runningTime + "sec", canvas.width/2, canvas.height/2)
  ctx.restore();
}

function drawGameOver() {
  ctx.fillRect(canvas.width/2, canvas.height/2, 100, 100);
}

beforDraw();
width/2, canvas.height/2)
  ctx.restore();
}

function drawGameOver() {
  ctx.fillRect(canvas.width/2, canvas.height/2, 100, 100);
}

beforDraw();
