export class Books {
  constructor(stageWidth, stageHeight) {

    //sizing
    this.size = 150;
    this.sizeY = this.size * 1.618

    //set boxes
    var ctrlOfsset = 8;
    this.offsetX = stageWidth / ctrlOfsset;
    this.offsetY = stageHeight / ctrlOfsset;
    this.numberX = Math.floor((stageWidth - this.offsetX * 2) / this.size);
    this.numberY = Math.floor((stageHeight - this.offsetY * 2) / this.sizeY);

    this.drawStart = this.offsetX
    this.drawEnd = stageWidth - this.drawStart;
    this.drawStartY = (stageHeight / 2 - this.offsetY) - (this.sizeY * this.numberY / 2) + this.offsetY;

    //set ls
    this.ls = [];
		this.dataNumber = 100;

    this.emptyLs();
    this.testLs();

    //ect
    this.h = stageHeight;
  }

  emptyLs() {
    if (this.numberY != 0) {
      var n = 0;
      while (n * this.numberY < this.dataNumber)  { n += 1; }
      this.lsX = this.size * (0.5 - parseInt(n / 2));
    }

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
        this.ls[i][k] = {n: n, color: "green"};
        n += 1
        if (n >= 100) { break; }
      }
    }
  }

  animate(ctx, moveX) {
    // moving Set
    var go = 1;
    if (moveX > 0) { go = 1; }
    else if (moveX < 0) { go = -1; }

    this.lsX += go + moveX * 0.13;
    while (this.lsX > this.drawStart) { this.lsX -= 0.001; }
    while (this.lsX + this.ls[0].length * this.size < this.drawEnd) { this.lsX += 0.001; }

    ctx.save();
    // guide line
    ctx.strokeStyle = "black";
    ctx.moveTo(this.drawStart, this.offsetY);
    ctx.lineTo(this.drawStart, this.h - this.offsetY);
    ctx.moveTo(this.drawEnd, this.offsetY);
    ctx.lineTo(this.drawEnd, this.h - this.offsetY);
    ctx.stroke();

    // fontSet
  	ctx.font = `30px Arial`;
    ctx.textBaseline = "hanging";

    // check & draw
		for (var i = 0; i < this.ls.length; i ++) {
      var y = this.drawStartY + this.sizeY * i;

      for (var k = 0; k < this.ls[i].length; k ++) {
        var x = this.lsX + this.size * k;

        if (this.drawStart - this.size < x && this.drawEnd > x) {
          if (this.ls[i][k].color == "red" && Math.random() < 0.004) { this.ls[i][k].color = "green"; }
          if (Math.random() < 0.0005) { this.ls[i][k].color = "red"; }

          ctx.strokeStyle = this.ls[i][k].color;
          ctx.strokeRect(x, y, this.size, this.sizeY);
          ctx.strokeText(this.ls[i][k].n, x, y);
        }

      }
    }

    ctx.restore();
  }
}
