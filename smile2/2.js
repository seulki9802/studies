var canvas = document.getElementById("smile");
var ctx = canvas.getContext("2d");

var starNumber = 10;
var stars = [];
for (i = 0; i < starNumber; i++) {
  var x = getRandomInt(0, canvas.width);
  var y = getRandomInt(canvas.height/8, canvas.height);
  stars[i] = { x : x, y : y, status : 1};
}

var x = 75;
var y = 75;
var dx = 5;
var dy = 5;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var smileSize = 20;
var eat = 0;
var eatTime = new Date();
var cong = 0;

var smileTime = 100;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
        x += dx;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        x -= dx;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
        y -= dy;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
        y += dy;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function coli() {
  for (i = 0; i < starNumber; i++) {
    var rx = stars[i].x + 7.5;
    var ry = stars[i].y + 2;
    var is = Math.sqrt(Math.pow(x - rx, 2) + Math.pow(y - ry, 2));
    if (is <= 7.5 + 20 && stars[i].status == 1) {
      eat += 1;
      cong += 1;
      stars[i].status = 0;
      eatTime = new Date();
      smileTime += 30;
    }
  }
}

function drawStar() {
  for ( i = 0; i < starNumber; i ++) {
    if (stars[i].status == 1) {
      var starX = stars[i].x;
      var starY = stars[i].y;
      ctx.beginPath();
      ctx.moveTo(starX, starY); //
      ctx.lineTo(starX + 15, starY);
      ctx.lineTo(starX + 3, starY + 9);
      ctx.lineTo(starX + 7.5, starY - 5);
      ctx.lineTo(starX + 12, starY + 9);
      ctx.lineTo(starX, starY);
      // ctx.arc(starX + 7.5, starY + 2, 7.5, 0, Math.PI * 2, true); // head
      ctx.stroke();
    }
  }
}

function drawSmile() {
  ctx.beginPath();
  ctx.arc(x, y, smileSize, 0, Math.PI * 2, true);
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

function drawTime() {
  ctx.font = '48px serif';
  ctx.fillText(smileTime, 40, 40);
  smileTime -= 0.3;
}

function drawTimeBar() {
  ctx.save();
  ctx.beginPath();
  for (i = 0; i < smileTime; i++) {
    // ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
    ctx.fillRect(i * canvas.width/100, 0, canvas.width/100, canvas.height/10);
  }
  smileTime -= 0.3;

  ctx.stroke();
  ctx.restore();
}

function gameOver() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("THE END", canvas.width/2, canvas.height/2)
}

function congratulation() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("ㅊㅋㅊㅋㅊㅋㅊㅋ", canvas.width/2, canvas.height/2)
}

function gaming() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStar();
  drawSmile();
  drawTimeBar();
  coli();
  test = new Date() - eatTime;
  if (test > 250) {
    eat = 0;
  }
}

function draw() {
  if (cong == 10) {
    congratulation();
  }
  else if (smileTime <= 0) {
    gameOver();
  }
  else {
    gaming();
  }
}

setInterval(draw, 10);
