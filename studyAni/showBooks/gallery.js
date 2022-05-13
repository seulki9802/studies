import {Picture} from './picture.js'
export class Gallery {
  constructor(stageWidth, stageHeight) {
    this.stageHeight = stageHeight;

    this.width = 100;
    this.height = this.width * 1.618;

    var ctrlOfsset = 10;
    this.offsetX = stageWidth / ctrlOfsset;
    this.offsetY = stageHeight / ctrlOfsset;
    this.numberX = Math.floor((stageWidth - this.offsetX * 2) / this.width);
    this.numberY = Math.floor((stageHeight - this.offsetY * 2) / this.height);

    this.drawStart = this.offsetX
    this.drawEnd = stageWidth - this.drawStart;
    this.drawStartY = (stageHeight / 2 - this.offsetY) - (this.height * this.numberY / 2) + this.offsetY;

		this.ls = [];
    this.dataNumber = 463;

    this.makePictures();
  }

	makePictures() {
    if (this.numberY != 0) {
      var n = 0;
      while (n * this.numberY < this.dataNumber) { n += 1; }
      this.lsX = this.width * (0.5 - parseInt(n / 2));
    }

    for (var i = 0; i < this.numberY; i ++) {
      this.ls[i] = [];
      for (var k = 0; k < n; k ++) {
        this.ls[i][k] = 0;
      }
    }

    var n = 0;
    for (var k = 0; k < this.ls[0].length; k ++) {
      var x = this.lsX + this.width * k;

      for (var i = 0; i < this.ls.length; i ++) {
        var y = this.drawStartY + this.height * i;

				if (n < this.dataNumber) {
          this.ls[i][k] = new Picture(x, y, this.width, n, 0);
        }
        else {
          this.ls[i][k] = new Picture(x, y, this.width, "X", 0);
        }
        n += 1
      }

    }

  }

  animate(ctx, moveX) {

    if (this.ls[0][0].x + moveX >= this.drawStart ||
    		this.ls[0][this.ls[0].length - 1].x + moveX <= this.drawEnd) {
          moveX = 0;
        }

    for (var i = 0; i < this.ls.length; i ++) {
      for (var k = 0; k < this.ls[i].length; k ++) {
        this.ls[i][k].x += moveX * 0.34;

        if (this.ls[i][k].x + this.width > this.drawStart &&
        		this.ls[i][k].x < this.drawEnd) {
              this.ls[i][k].animate(ctx);
            }
      }
    }

    ctx.clearRect(0, 0, this.drawStart, this.stageHeight);
    ctx.clearRect(this.drawEnd, 0, this.drawStart, this.stageHeight)

  }

  onClick(x, y) {
    for (var i = 0; i < this.ls.length; i ++) {
      for (var k = 0; k < this.ls[i].length; k ++) {
        this.ls[i][k].onClick(x, y);
      }
    }

  }
}
