function draw() {
  if (!gameOver) {
    if (lastDraw) {
      gameOver = 1;
    }
    drawGame();
  }
  else {
    drawGameOver();
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRunningTime();
  drawSmile();
  moveSmile();
  drawGauage();
  if(runningTime >= stone01s[0].startTime) {stone(stone01s);}
  if(runningTime >= stone02s[0].startTime) {stone(stone02s);}
  if(runningTime >= stone03s[0].startTime) {stone(stone03s);}
  if(runningTime >= stone04s[0].startTime) {stone(stone04s);}
  if(runningTime >= stone05s[0].startTime) {stone(stone05s);}
  if(runningTime >= 40) {
    spearSize += ds;
    if(runningTime >= 60) {ds = spearSize * 0.005 * 2}
    if (spearSize > startSpear * 2) { ds = -ds }
    if (spearSize < 0) { ds = -ds }
  }
  if(runningTime >= stone06s[0].startTime) {stone(stone06s);}
  drawSpear();
  drawItemBox();
  drawItem();
}

beforDraw();
