export class DataRefine {
  constructor() {
    this.string = [];
    this.count = [];
    this.dx = 1;

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

  animate(ctx, stageWidth, stageHeight, fontSize) {

    this.dx += this.dx * 0.04;

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

        ctx.fillStyle = "red";
        ctx.fillText(beforeSemi, startX - this.dx, startY + fontSize * i);

        ctx.fillStyle = "yellow";
        ctx.fillText(afterSemi, startX + ctx.measureText(beforeSemi).width, startY + fontSize * i);

        ctx.fillStyle = "blue";
        ctx.fillText(afterBracket, startX + this.dx + ctx.measureText(beforeSemi).width + ctx.measureText(afterSemi).width, startY + fontSize * i);

      }

      else if (startX  - this.dx/1000 + ctx.measureText(beforeSemi).width > stageWidth / 3) {

        ctx.fillStyle = "black";
        ctx.fillText(afterSemi, startX  - this.dx/1000 + ctx.measureText(beforeSemi).width, startY + fontSize * i);

      }

      else {

        ctx.fillStyle = "gray";
        ctx.fillText(afterSemi, stageWidth / 3, startY + fontSize * i);

        for (var k = 0; k <= countList.length; k ++) {
          if (k == countList.length) {
            countList[k] = {str: afterSemi, n: 0};
          }
          if (afterSemi == countList[k].str) {
            countList[k].n += 1;
            ctx.fillStyle = "orange";
            ctx.fillText(afterSemi, stageWidth / 3 * 2, startY + fontSize * k);
            break
          }
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
    var string = document.getElementById('tt').textContent.replace(/ /gi, '');
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
