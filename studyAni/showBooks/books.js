export class Books {
  constructor(stageWidth, stageHeight) {

		this.unitNumber = 7

    //sizing
    if (stageHeight > stageWidth ) {
      this.size = stageHeight / this.unitNumber;
      this.numberX = Math.floor(stageWidth / this.size);
      this.numberY = this.unitNumber - 1;
      this.offsetX = (stageWidth - this.numberX * this.size) / 2;
      this.offsetY = this.size / 2;
    }
    else {
      this.size = stageWidth / this.unitNumber;
      this.numberX = this.unitNumber - 1;
      this.numberY = Math.floor(stageHeight / this.size);
      this.offsetX = this.size / 2;
      this.offsetY = (stageHeight - this.numberY * this.size) / 2;
    }

    this.drawStart = this.offsetX
    this.drawEnd = stageWidth - this.offsetX;

    this.ls = [];
		this.dataNumber = 100;

    this.emptyLs();

    this.testLs();
  }

  emptyLs() {
    var n = 0;
    while (n * this.numberY < this.dataNumber) { n += 1; }
    this.lsX = -parseInt(n / 2) * this.size;

		for (var i = 0; i < this.numberY; i ++) {
      this.ls[i] = [];
      for (var k = 0; k < n; k ++) {
        this.ls[i][k] = 0;
      }
    }
  }

  testLs() {
    var n = 0;

    for (var k = 0; k < this.ls[0].length; k ++) {
      for (var i = 0; i < this.ls.length; i ++) {
        this.ls[i][k] = n;
        n += 1
        if (n >= 100) { break; }
      }
    }
  }

  animate(ctx, moveX, color, touchX) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillText(touchX, 10, 10);

		for (var y = 0; y < this.numberY; y ++) {
      for (var x = 0; x < this.numberX; x ++) {
        ctx.rect(this.x + x * this.size, this.y + y * this.size, this.size, this.size)
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  animate2(ctx, moveX) {
    ctx.save();
  	ctx.font = `30px Arial`;
    ctx.textAlign = "center";

    ctx.strokeStyle = "black";
    ctx.moveTo(this.drawStart, this.offsetY);
    ctx.lineTo(this.drawStart, 1000);
    ctx.moveTo(this.drawEnd, this.offsetY);
    ctx.lineTo(this.drawEnd, 1000);
    ctx.stroke();

    this.lsX += 0 + moveX * 0.5;
    while (this.lsX > this.drawStart) { this.lsX -= 0.001; }
    while (this.lsX + this.ls[0].length * this.size < this.drawEnd) { this.lsX += 0.001; }

		for (var i = 0; i < this.ls.length; i ++) {
      // var y = this.offsetY + this.size * (i + 0.5);
      var y = this.offsetY + this.size * i;

      for (var k = 0; k < this.ls[i].length; k ++) {
        // var x = this.lsX + this.size * (k + 0.5);
        var x = this.lsX + this.size * k;

        // if (this.drawStart < x && x < this.drawStart + (this.size * this.numberX)) {
        if (this.drawStart <= x && x <= this.drawStart + (this.size * this.numberX)) {
          // ctx.fillStyle = "green";
          // ctx.fillText(this.ls[i][k], x, y)
          ctx.strokeStyle = "green";
          ctx.rect(x, y, this.size, this.size);
          ctx.stroke();
        }
        // else {
        //   // ctx.fillStyle = "yellow";
        //   // ctx.fillText(this.ls[i][k], x, y);
        //   ctx.strokeStyle = "yellow";
        //   ctx.rect(x, y, this.size, this.size);
        //   ctx.stroke();
        // }

      }
    }

    ctx.restore();
  }
}
