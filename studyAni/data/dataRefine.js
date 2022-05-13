export class DataRefine {
  constructor() {
    this.string = []

		var string = document.getElementById('tt').textContent.replace(/ /gi, '');
    var stringLine = '';
    var n = 0;
    for (var i = 0; i < string.length; i ++) {
      if (string[i] == '\n') {
        this.string[n] = {str : stringLine};
        n += 1;
        stringLine = ''
      } else {
        stringLine += string[i];
      }
    }
  }

  charIndex(char, charName) {
    for (var i = 0; i < this.string.length; i ++) {
      for (var k = 0; k < this.string[i].str.length; k ++) {
        if (this.string[i].str[k] == char) {
          this.string[i][charName] = k;
        }
      }
    }
  }

  animate(ctx, x, y, fontSize) {
    this.line(ctx, x, y);
    this.charIndex(":", "semi");

    ctx.save();
    ctx.font = `${fontSize}px Arial`;
    // ctx.fillStyle = "blue";
    // ctx.textAlign = "center";
    ctx.textBaseline ="top";
    for (var i = 0; i < this.string.length; i++) {
      var beforeSemi = this.string[i].str.slice(0, this.string[i].semi);
      var afterSemi = this.string[i].str.slice(this.string[i].semi, );
      ctx.fillStyle = "red";
      ctx.fillText(beforeSemi, x, y + (i * fontSize));
      ctx.fillStyle = "blue";
      ctx.fillText(afterSemi, x + ctx.measureText(beforeSemi).width, y + (i * fontSize));
      // ctx.fillText(this.string[i].str, x, y + (i * fontSize));
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

}
