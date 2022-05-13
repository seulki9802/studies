export class DataRefine {
  constructor(stageWidth, stageHeight, ctx) {
    this.stageHeight = stageHeight;
    this.color = "white"
    this.fontSize = 25;

    this.ctx = ctx;
    this.ctx.font = `${this.fontSize}px Arial`;
    this.ctx.textBaseline ="middle";

    this.offset = stageHeight / 10;
    this.startY = this.offset;
    this.startX = this.offset;

    this.makeStringList();

		this.removing = 0;
    this.isDown = 0;

    this.removingSpeed = 0.03;
    this.movingSpeed = 4;

  }

  animate() {
    this.ctx.save();

    this.ctx.fillStyle = "green";
    this.ctx.fillText(this.isDown, this.fontSize, this.fontSize);

    for(var i = this.string.length - 1; i >= 0; i --) {
      var y = this.startY + this.fontSize * i;
      for (var k = this.string[i].length - 1; k >= 0; k --) {

        this.checkPos(i, k);

        if ( y > this.offset && y < this.stageHeight - this.offset ) {
          this.ctx.globalAlpha = this.string[i][k].alpha;
          this.ctx.fillStyle = this.string[i][k].color;
          this.ctx.fillText(this.string[i][k].str, this.string[i][k].x, y);
        }

        this.removeEle(i, k);
        // this.makeData(i, k);

      }
    }
    this.ctx.restore();
  }

  down() {
    if (this.removing == 0) {
      this.isDown += 1;
      if (this.isDown == 1) { this.refineString(":", "before", "red"); }
      if (this.isDown == 2) { this.refineString("(", "after", "blue"); this.refineString(")", "before", "blue"); }
      // if (this.isDown == 3) { this.refineString(",", "none", "gray");}
    }
  }

  removeEle(i, k) {
    if (this.string[i][k].color != this.color && this.string[i][k].color != "yellow" ) {
      this.string[i][k].alpha -= this.removingSpeed;
      this.removing = 1;
    }
    if (this.string[i][k].alpha < 0) {
      this.string[i].splice(k, 1);
      this.removing = 0;
    }
  }

  makeData(i, k) {
    if (this.string[i][k].color == "gray") {
      this.string[i][k].color = "yellow";
      for (var ii = this.string.length - 1; ii > i + 1; ii --) {
        if (ii = i ) {console.log(i)};
        this.string[ii + 1] = this.string[ii]
      }
      this.string[i + 1] = [this.string[i][k + 1]];
      this.string[i].splice(k, );
    }
  }

	checkPos(i, k) {
    if (k != 0) {
      if (this.string[i][k].x - this.string[i][k - 1].x > this.ctx.measureText(this.string[i][k - 1].str).width) {
        this.string[i][k].x -= this.movingSpeed;
      }
    } else {
      if (this.string[i][k].x > this.startX) { this.string[i][k].x -= this.movingSpeed;}
    }
  }

  makeStringList() {
    this.string = [];

    var string = document.getElementById('tt').textContent; //.replace(/ /gi, '');
    var stringLine = '';
    var n = 0;

    for (var i = 0; i < string.length; i ++) {

      if (string[i] == '\n' && stringLine != '') {
        stringLine = stringLine.replace(/\n|\r/g, '');
        stringLine = this.removeBlank(stringLine);
        this.string[n] = [{str: stringLine, color: this.color, x: this.startX, alpha: 1}];
        n += 1;
        stringLine = '';
      }

      else {
        stringLine += string[i];
      }

    }
    this.totalY = (this.string.length - 1) * this.fontSize;
  }

  refineString(char1, location, color) {
    for (var i = 0; i < this.string.length; i ++) {
      for (var k = this.string[i].length - 1; k >= 0; k --) {
        var n = [];
        for (var t = 0; t < this.string[i][k].str.length; t ++) {
          if (this.string[i][k].str[t] == char1) {n[n.length] = t}
        }
        while (n.length != 0) {
          var indexN = n[n.length - 1];

          var before = this.string[i][k].str.slice(0, indexN);
          var middle = this.string[i][k].str.slice(indexN, indexN + 1);
          var after = this.string[i][k].str.slice(indexN + 1, );
          var x = this.string[i][k].x;

          for (var t = this.string[i].length - 1; t > k; t --) {
            this.string[i][t + 2] = this.string[i][t];
          }

          var beforeColor, middleColor, afterColor;

          if (location == "before") {beforeColor = color, afterColor = this.color}
          else if (location == "after") {beforeColor = this.color, afterColor = color}
          else if (location == "none") {beforeColor = this.color, afterColor = this.color}

          this.string[i][k]= {str: before, color: beforeColor, x: x, alpha: 1};
          this.string[i][k + 1] = {str: middle, color: color, x: x + this.ctx.measureText(before).width, alpha: 1};
          this.string[i][k + 2] = {str: after, color: afterColor, x: x + this.ctx.measureText(before + middle).width, alpha: 1};

					n.splice(n.length - 1, )
        }
      }
    }
  }

  removeBlank(string) {
    var refineString = string;

    if (string[0] == false) {
      for (var i = 0; i < string.length; i ++) {
        if (string[i] != false) { break; }
        else { refineString = refineString.replace(' ', '') }
      }
    }
    return refineString;
  }

  startPos(moveY, moveX) {
    this.startY += moveY
    // this.startX += moveX

    if(this.startY > this.offset) { this.startY -= moveY; }
    if(this.startY + this.totalY < this.stageHeight - this.offset) { this.startY -= moveY; }

    // if(this.startX > this.offset) { this.startX = this.offset; }
  }
}
