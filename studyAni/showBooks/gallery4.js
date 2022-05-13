import {Picture} from './picture4.js'
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

    this.dx = 1;
    this.select = 0;
    this.selectObj = [0, 0];

    this.makePictures();
  }

	makePictures() {
    var infos = document.getElementsByTagName('tr');

    // list sizing
    if (this.numberY != 0) {
      var n = 0;
      while (n * this.numberY < infos.length - 1) { n += 1; }
      this.lsX = this.width * (0.5 - parseInt(n / 2));
    }

    // make empty list
    for (var i = 0; i < this.numberY; i ++) {
      this.ls[i] = [];
      for (var k = 0; k < n; k ++) {
        this.ls[i][k] = 0;
      }
    }

    var n = 1;
    for (var k = 0; k < this.ls[0].length; k ++) {
      var x = this.lsX + this.width * k;

      for (var i = 0; i < this.ls.length; i ++) {
        var y = this.drawStartY + this.height * i;

				if (n <= infos.length - 1) {

          var name = infos[n].children[0].textContent;
          var birth = infos[n].children[1].textContent;
          var birthP = infos[n].children[2].textContent;
          var birthP2 = infos[n].children[3].textContent;
          var death = infos[n].children[4].textContent;
          var deathP = infos[n].children[5].textContent;
          var deathP2 = infos[n].children[6].textContent;
          var img = infos[n].children[7].textContent;

          this.ls[i][k] = new Picture(
            x, y, this.width,
            name,
            birth, birthP, birthP2,
            death, deathP, deathP2,
            img,
            0,
            n
          );
        }
        else {
          this.ls[i][k] = new Picture(
            x, y, this.width,
            "unknown",
            "unknown", "unknown", "unknown",
            "unknown", "unknown", "unknown",
            "unknown",
            0,
            n
          );
        }
        n += 1
      }

    }

  }

  animate(ctx, moveX, isDown) {
    // if (moveX > 0) { this.dx = 1; }
    // else { this.dx = -1; }

    // if (on  == 1 ||
    //     this.ls[0][0].x + moveX >= this.drawStart ||
    // 		this.ls[0][this.ls[0].length - 1].x + moveX <= this.drawEnd) {
    //       moveX = 0;
    //       this.dx = 0;
    // }
    
    if (isDown) { this.dx = 0 }
    else { this.dx = 1; }

    this.select = this.selectObj.isSelected
    if (this.selectObj.x + this.width < this.drawStart ||
    		this.selectObj.x > this.drawEnd) { this.selectObj.isSelected = 0; }

    for (var i = 0; i < this.ls.length; i ++) {
      for (var k = 0; k < this.ls[i].length; k ++) {
        this.ls[i][k].x += this.dx + moveX * 0.34;

        if (this.ls[i][k].x + this.width > this.drawStart &&
        		this.ls[i][k].x < this.drawEnd) {

              if (!this.select && Math.random() < 0.001) {
                this.select = 1;
                this.selectObj = this.ls[i][k];
								this.ls[i][k].isSelected = 1;
              }

              this.ls[i][k].animate(ctx);
        }
      }
    }

    this.selectObj.animate(ctx);

    ctx.clearRect(0, 0, this.drawStart, this.stageHeight);
    ctx.clearRect(this.drawEnd, 0, this.drawStart, this.stageHeight)

  }

  onClick(x, y) {
    this.selectObj.isSelected = 0;
    for (var i = 0; i < this.ls.length; i ++) {
      for (var k = 0; k < this.ls[i].length; k ++) {
        var obj = this.ls[i][k].onClick(x, y)
      	if (obj) { this.selectObj = obj; }
      }
    }

  }
}
