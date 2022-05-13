export class DataRefine {
  constructor() {
    this.string = [];
    this.count = [];
    this.dx = 1;
    this.dx2 = 1;
    this.dx3 = 1;
    this.dy3 = 1;
    this.down = 0;

    this.makeStringList();
    this.indexChar(":", "semi");
    this.indexChar("(", "bracket")
  }

  indexChar(char, charName) {
    for (var i = 0; i < this.string.length; i ++) {
      for (var k = 0; k < this.string[i].str.length; k ++) {
        if (this.string[i].str[k] == char) {
          this.string[i][charName] = k;
        }
      }
    }
  }

  isDown() {
    this.down += 1;
  }

  animate(ctx, stageWidth, stageHeight, fontSize) {

    ctx.save();
    ctx.font = `${fontSize}px Arial`;
    ctx.textBaseline ="middle";

    var totalY = (this.string.length - 1) * fontSize;
    var startY = (stageHeight - totalY) / 2
    var startX = (stageWidth - ctx.measureText(this.string[0].str).width) / 2

    var countList = [];

    for(var i = 0; i < this.string.length; i ++) {

      var beforeSemi = this.string[i].str.slice(0, this.string[i].semi + 1);
      var afterSemi = this.string[i].str.slice(this.string[i].semi + 1, this.string[i].bracket);
      var afterBracket = this.string[i].str.slice(this.string[i].bracket, );

      if (startX - this.dx > 0 && startX + this.dx < stageWidth) {
        this.dx += this.dx * 0.05 / this.string.length;

        ctx.fillStyle = "red";
        ctx.fillText(beforeSemi, startX - this.dx, startY + fontSize * i);

        ctx.fillStyle = "yellow";
        ctx.fillText(afterSemi, startX + ctx.measureText(beforeSemi).width, startY + fontSize * i);

        ctx.fillStyle = "blue";
        ctx.fillText(afterBracket, startX + this.dx + ctx.measureText(beforeSemi).width + ctx.measureText(afterSemi).width, startY + fontSize * i);

      }

      else if (startX  - this.dx2 + ctx.measureText(beforeSemi).width > stageWidth / 3) {
				this.dx2 += this.dx2 * 0.05 / this.string.length;
        ctx.fillStyle = "yellow";
        ctx.fillText(afterSemi, startX  - this.dx2 + ctx.measureText(beforeSemi).width, startY + fontSize * i);

      }

      else if (stageWidth / 3 + this.dx3 < stageWidth / 3 * 2) {
        this.dx3 += this.dx3 * 0.05 / this.string.length;

        ctx.fillStyle = "yellow";
        ctx.fillText(afterSemi, stageWidth / 3, startY + fontSize * i);

        for (var k = 0; k <= countList.length; k ++) {
          if (k == countList.length) {
            countList[k] = {str: afterSemi, n: 0};
          }
          if (afterSemi == countList[k].str) {
            countList[k].n += 1;
            // ctx.fillStyle = "orange";
            // ctx.fillText(afterSemi + countList[k].n, stageWidth / 3 * 2, startY + fontSize * k);

            var a = ((startY + fontSize * k) - (startY + fontSize * i)) / (stageWidth / 3 * 2 - stageWidth / 3);
            this.dy3 = this.dx3 * a;
            ctx.fillStyle = "orange";
            ctx.fillText(afterSemi, stageWidth / 3 + this.dx3, startY + this.dy3 + fontSize * i);

            break
          }
        }
        this.count = countList;
      }
      else {
      	for (var k = 0; k < this.count.length; k ++) {
          ctx.fillStyle = "orange";
        	ctx.fillText(this.count[k].str + ': ' + this.count[k].n, stageWidth / 3 * 2, startY + fontSize * k);
      	}
      }
    }
    ctx.restore();
  }

  line(ctx, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1000, y);
    ctx.stroke();
    ctx.closePath();
  }

  makeStringList() {
    var string = document.getElementById('tt').textContent; //.replace(/ /gi, '');
    var stringLine = '';
    var n = 0;
    for (var i = 0; i < string.length; i ++) {
      if (string[i] == '\n' && stringLine != '') {
        stringLine = stringLine.replace(/\n|\r/g, '');
        this.string[n] = {str : stringLine};
        n += 1;
        stringLine = '';
      } else {
        stringLine += string[i];
      }
    }
  }
}
