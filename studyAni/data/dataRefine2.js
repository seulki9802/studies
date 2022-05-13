export class DataRefine {
  constructor() {
    this.string = []
    this.count = []

		var string = document.getElementById('tt').textContent.replace(/ /gi, '');
    var stringLine = '';
    var n = 0;
    for (var i = 0; i < string.length; i ++) {
      if (string[i] == '\n' && stringLine != '') {
        this.string[n] = {str : stringLine};
        n += 1;
        stringLine = ''
      } else {
        stringLine += string[i];
      }
    }
    this.charIndex(":", "semi");
    this.charIndex("(", "bracket")
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

  test() {
    var firstInfo = this.string[0].str.slice(this.string[0].semi + 1, this.string[0].bracket);
		this.count[0] = {str: firstInfo, n:0, y: 100};
    for (var i = 0; i < this.string.length; i ++) {
      var afterSemi = this.string[i].str.slice(this.string[i].semi + 1, this.string[i].bracket);
			for (var k = 0; k < this.count.length; k ++) {
        if (afterSemi == this.count[k].str) {
          this.count[k].n += 1;
          break
        }
        if (k == this.count.length - 1) {
          this.count[k + 1] = {str: afterSemi, n: 0, y: 100 + 40 * (k + 1)};
        }
      }
    }
    console.log(this.count)
  }

  animate(ctx, x, y, fontSize, dx) {
    this.line(ctx, x, y);

    ctx.save();
    ctx.font = `${fontSize}px Arial`;
    // ctx.fillStyle = "blue";
    // ctx.textAlign = "center";
    ctx.textBaseline ="top";
    for (var i = 0; i < this.string.length; i++) {
      var beforeSemi = this.string[i].str.slice(0, this.string[i].semi + 1);
      var afterSemi = this.string[i].str.slice(this.string[i].semi + 1, this.string[i].bracket);
      var afterBracket = this.string[i].str.slice(this.string[i].bracket, );
      ctx.fillStyle = "red";
      ctx.fillText(beforeSemi, x - dx, y + (i * fontSize));

      ctx.fillStyle = "blue";
      ctx.fillText(afterSemi, x + ctx.measureText(beforeSemi).width, y + (i * fontSize));

      ctx.fillStyle = "gray";
      ctx.fillText(afterBracket,
         x + dx + ctx.measureText(beforeSemi).width + ctx.measureText(afterSemi).width,
         y + (i * fontSize));
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
