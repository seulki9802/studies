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

		this.removing = 0;
    this.isDown = 0;

    this.removingSpeed = 0.03;
    this.movingSpeed = 4;

    this.rmColor = "yellow"

    this.makeStringList();
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

        this.dataRefine(i, k)

      }
    }
    this.ctx.restore();
  }

  down() {
    if (this.removing == 0) {
      this.isDown += 1;
      if (this.isDown == 1) { this.refineString(":", "before", "red"); }
      if (this.isDown == 2) { this.refineString("(", "after", "blue"); this.refineString(")", "before", "blue"); }
      if (this.isDown == 3) { this.refineString(",", "none", this.rmColor); this.refineString(";", "none", this.rmColor); }
      if (this.isDown == 4) { this.refineString(" ", "none", this.color); }
    }
  }

  dataRefine(i, k) {
    //create new info
    if (this.string[i][k].color == this.rmColor) {
      for (var ii = this.string.length - 1; ii > i; ii --) {
        this.string[ii + 1] = this.string[ii]
      }
      this.string[i + 1] = [this.string[i][k + 1]];
      this.string[i].splice(k, );
    }

    //remove a char
    else if (this.string[i][k].color != this.color) {
      this.string[i][k].alpha -= this.removingSpeed;
      this.removing = 1;
    	if (this.string[i][k].alpha < 0) {
      	this.string[i].splice(k, 1);
      	this.removing = 0;
    	}
  	}

		// rm side blanck = ' ' & trash info = ''
    // if (this.isDown == 4) {
    //   if (k == this.string[i].length - 1 && this.string[i][k].str == ' ') { this.string[i].splice(k, 1); }
    //   else if (k == 0 && this.string[i][k].str == ' ') { this.string[i].splice(k, 1) }
    //   else if (this.string[i][k].str == '' ){ this.string[i].splice(k, 1); }
    // }

    // if (this.isDown == 5) {
    //   if (this.string[i][k].str == false) { this.string[i].splice(k, 1); }
    // }

    if (this.isDown == 4) {
      if (this.string[i][k].str[0] == undefined) { this.string[i].splice(k, 1); }
      else if (this.string[i][k].str != ' ') {
        if (!isNaN(this.string[i][k].str[0]) || this.string[i][k].str[0] != this.string[i][k].str[0].toUpperCase()) {
          this.string[i].splice(k, 1);
        }
      }
      else if (k != this.string[i].length - 1 &&
        			this.string[i][k].str == ' ' && this.string[i][k + 1].str == ' ' ) { this.string[i].splice(k, 2); }
    }

    // if (this.isDown == 5) {
    //   if (this.string[i][k].str == '') { this.string[i].splice(k, 1); }
    //   else if (k != 0 && this.string[i][k].str == ' ' && this.string[i][k - 1].str == ' ') { this.string[i].splice(k, 1); }
    // }

    // // rm not upper
    // if (this.isDown == 6) {
    //   if (this.string[i][k].str != ' ') {
    //     console.log(this.string[i][k]);
    //     if (!isNaN(this.string[i][k].str[0]) || this.string[i][k].str[0] != this.string[i][k].str[0].toUpperCase()) {
    //       if (k != this.string[i].length && this.string[i][k + 1].str == false) {this.string[i].splice(k, 2);}
    //       else { this.string[i].splice(k, 1); }
    //     }
    //   }
    //   console.log(`${i}, ${k}: `, this.string[i][k])
    // }

  }

	checkPos(i, k) {
    if (k > 0) {
      if (this.string[i][k].x - this.string[i][k - 1].x > this.ctx.measureText(this.string[i][k - 1].str).width) {
        this.string[i][k].x -= this.movingSpeed;
        if (this.string[i][k].x - this.string[i][k - 1].x <= this.ctx.measureText(this.string[i][k - 1].str).width) {
          this.string[i][k].x = this.string[i][k - 1].x + this.ctx.measureText(this.string[i][k - 1].str).width;
        }
      }
    } else {
      if (this.string[i][k].x > this.startX) {
        this.string[i][k].x -= this.movingSpeed;
        if (this.string[i][k].x <= this.startX) {
          this.string[i][k].x = this.startX;
        }
      }
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
