function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function drawSmile() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, smileSize, 0, Math.PI * 2, true);
  for (i = 0; i < gameGauge; i++) {
    ctx.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
    ctx.fill();
  }
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

function moveSmile() {
  // up down
  if (jump == 0) { y -= dy * 1.5; }
  else {
    y += dy; jump += 1;
    if (jump == smileSize * 2) { jump = 0 ;}
  }
  if (y <= spearSize + smileSize || y >= canvas.height - spearSize - smileSize) {
    // gameOver = 1;
    lastDraw = 1;
  }

  // right - left (keyboard controll)
  if (rightPressed == true && x <= canvas.width - smileSize) { x += dx; }
  if (leftPressed == true && x >= smileSize) { x -= dx; }

}

function stone(stone0Xs) {
  //create
  var number = stone0Xs.length;
  var size = stone0Xs[0].size;
  var speed = stone0Xs[0].speed;
  now = Math.floor(runningTime * 10)/10 //소숫점 첫번째 까지~
  dt = Math.floor(stone0Xs[0].sec * number * 10)/10 + stone0Xs[0].startTime
  if( now == dt) {
    var s1x = getRandomInt(canvas.width, canvas.width * 1.3);
    var s1y = getRandomInt(0, canvas.height);
    stone0Xs[number] = { x: s1x, y: s1y, status: 1};
    dt = stone0Xs[0].sec * (stone0Xs.length);
    dt = Math.floor(dt * 10)/10
  }

  //draw
  var color = stone0Xs[0].color;
  ctx.save();
  ctx.beginPath();
  for(i in stone0Xs) {
    if (stone0Xs[i].status) {
      var s1x = stone0Xs[i].x;
      var s1y = stone0Xs[i].y;
      ctx.moveTo(s1x, s1y);
      ctx.arc(s1x, s1y, size, 0, Math.PI * 2, true);
      stone0Xs[i].x -= speed;
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  //colli
  for (i in stone0Xs) {
    var dis = Math.sqrt((stone0Xs[i].x - x)**2 + (stone0Xs[i].y - y)**2)
    if (dis < smileSize + size && stone0Xs[i].status == 1) {
      stone0Xs[i].status = 0;
      gameGauge -= size * 0.5;
      if (gameGauge <= 0) {
        // gameOver = 1;
        lastDraw = 1;
      }
      // drawGameOver();
    }
  }
}
