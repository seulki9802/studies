export class DataRefine {
  constructor(stageWidth, stageHeight, fontSize) {
    this.makeStringList();
    this.refineString(",", "white");
    this.refineString(":", "yellow");
    this.refineString("(", "red");
    this.refineString(")", "red");
    this.dx = 0;

    this.fontSize = fontSize;
    this.stageHeight = stageHeight;

    this.totalY = (this.string.length - 1) * this.fontSize;
    this.offset = stageHeight / 15;
    this.startY = this.offset;
    this.startX = this.offset;

  }

  animate(ctx) {
    ctx.save();

    ctx.font = `${this.fontSize}px Arial`;
    ctx.textBaseline ="middle";

    for(var i = 0; i < this.string.length; i ++) {

      var x = this.startX;
      var y = this.startY + this.fontSize * i;
      var dx = 0;
      var start = 0;
      var stop = 0;

      for(var k = 0; k < this.string[i].length; k ++) {

        if (k != 0) { x += ctx.measureText(this.string[i][k - 1].str).width; }

        //move to left
        if (this.string[i][k].str == ":") { dx = 0; stop = 1; }
        else if (stop == 0) { this.dx -= 0.01; dx = this.dx; }

        // //move to right
				// if (this.string[i][k].str == ",") { dx = 0; start = 1; }
        // else if (start == 1) { this.dx += 0.01; dx = this.dx; }

        ctx.fillStyle = this.string[i][k].color;
        ctx.fillText(this.string[i][k].str, x + dx, y);
      }
      start = 0;

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
        this.string[n] = [{str: stringLine, color: "black"}];
        // this.string[n][this.string[n].length] = {str: "test", color: "blue"};
        n += 1;
        stringLine = '';
      }

      else {
        stringLine += string[i];
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

  refineString(char1, color) {
    for (var i = this.string.length - 1; i >= 0; i --) {
      for (var k = this.string[i].length - 1; k >= 0; k --) {
        var indexN = this.string[i][k].str.indexOf(char1);
        if (indexN != -1) {
					var before = this.string[i][k].str.slice(0, indexN);
          var middle = this.string[i][k].str.slice(indexN, indexN + 1);
          var after = this.string[i][k].str.slice(indexN + 1, );

					for(var t = this.string[i].length - 1; t > k; t --) {
            this.string[i][t + 2] = this.string[i][t];
          }

          var orginColor = this.string[i][k].color;
          this.string[i][k]= {str: before, color: orginColor};
          this.string[i][k + 1] = {str: middle, color: color};
          this.string[i][k + 2] = {str: after, color: orginColor};
        }
      }
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
