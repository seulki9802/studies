export class DataRefine {
  constructor(stageWidth, stageHeight, ctx, fontSize) {
    this.ctx = ctx;
    this.fontSize = fontSize;
    this.stageHeight = stageHeight;

    this.offset = stageHeight / 15;
    this.startY = this.offset;
    this.startX = this.offset;

    this.makeStringList();
    this.refineString(":", "red", this.ctx);
  }

  animate(ctx) {
    ctx.save();

    ctx.font = `${this.fontSize}px Arial`;
    ctx.textBaseline ="middle";

    for(var i = 0; i < this.string.length; i ++) {
      var y = this.startY + this.fontSize * i;

      for(var k = 0; k < this.string[i].length; k ++) {
        ctx.fillStyle = this.string[i][k].color;
        ctx.fillText(this.string[i][k].str, this.string[i][k].x	, y);
      }
    }
    ctx.restore();
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
        this.string[n] = [{str: stringLine, color: "yellow", x: this.startX}];
        // this.string[n][this.string[n].length] = {str: "test", color: "blue", x: this.startX};
        n += 1;
        stringLine = '';
      }

      else {
        stringLine += string[i];
      }

    }
    this.totalY = (this.string.length - 1) * this.fontSize;
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

  refineString(char1, color, ctx) {
    ctx.font = `${this.fontSize}px Arial`;
    for (var i = this.string.length - 1; i >= 0; i --) {
      for (var k = this.string[i].length - 1; k >= 0; k --) {
        var indexN = this.string[i][k].str.indexOf(char1);
        if (indexN != -1) {
					var before = this.string[i][k].str.slice(0, indexN);
          var middle = this.string[i][k].str.slice(indexN, indexN + 1);
          var after = this.string[i][k].str.slice(indexN + 1, );
          var x = this.string[i][k].x;

					for(var t = this.string[i].length - 1; t > k; t --) {
            this.string[i][t + 2] = this.string[i][t];
          }

          var orginColor = this.string[i][k].color;
          this.string[i][k]= {str: before, color: orginColor, x: x};
          this.string[i][k + 1] = {str: middle, color: color, x: x + ctx.measureText(before).width};
          this.string[i][k + 2] = {str: after, color: orginColor, x: x + ctx.measureText(before + middle).width};
        }
      }
    }
  }

	locateString() {
    for (var i = 0; i < this.string.length; i++){

    }
  }

  startPos(moveY, moveX) {
    this.startY += moveY
    this.startX += moveX

    if(this.startY > this.offset) { this.startY -= moveY; }
    if(this.startY + this.totalY < this.stageHeight - this.offset) { this.startY -= moveY; }

    if(this.startX > this.offset) { this.startX = this.offset; }
  }
}
