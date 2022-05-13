function beforDraw() {
  ctx.fillRect(canvas.width/2, canvas.height/2, 100, 100);
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

function drawGauage() {
  ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
  ctx0.save();
  ctx0.beginPath();
  for (i = 0; i < gameGauge; i++) {
    // ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx0.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
    ctx0.fillRect(i * canvas0.width/100, 0, canvas0.width/100, gameGaugeSize);
  }
  // gameGauge -= 0.3;
  ctx0.restore();
}
