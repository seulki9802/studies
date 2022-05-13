export class DataRefine {
  constructor(stageWidth, stageHeight, fontSize) {
    this.string = [];
    this.count = [];

    this.makeStringList();
    this.indexChar(":");
    this.indexChar("(")
    this.indexChar(")")

    this.fontSize = fontSize;
    this.stageHeight = stageHeight;

    this.totalY = (this.string.length - 1) * this.fontSize;
    this.offset = stageHeight / 15;
    this.startY = this.offset;
    this.startX = this.offset;

  }

  animate(ctx, moveY, moveX) {

    this.startY += moveY
    this.startX += moveX

    if(this.startY > this.offset) { this.startY -= moveY; }
    if(this.startY + this.totalY < this.stageHeight - this.offset) { this.startY -= moveY; }


    if(this.startX > this.offset) { this.startX = this.offset; }

    ctx.save();

    ctx.font = `${this.fontSize}px Arial`;
    ctx.textBaseline ="middle";

    for(var i = 0; i < this.string.length; i ++) {

      var beforeB = this.selectInfo(this.string[i], "before", 0, "(");
      var bracket = this.selectInfo(this.string[i], "middle", 1, "(", ")");
      var afterB = this.selectInfo(this.string[i], "after", 0, ")");

      ctx.fillStyle = "black";
      ctx.fillText(beforeB, this.startX, this.startY + this.fontSize * i);
      ctx.fillText(afterB, this.startX + ctx.measureText(beforeB + bracket).width, this.startY + this.fontSize * i);

      ctx.fillStyle = "yellow";
      ctx.fillText(bracket, this.startX + ctx.measureText(beforeB).width, this.startY + this.fontSize * i);

      var beforeSemi = this.selectInfo(this.string[i], "before", 1, ":");
      ctx.fillStyle = "red";
      ctx.fillText(beforeSemi, this.startX, this.startY + this.fontSize * i);


    }

    ctx.restore();
  }

  makeStringList() {

    var string = document.getElementById('tt').textContent; //.replace(/ /gi, '');
    var stringLine = '';
    var n = 0;

    for (var i = 0; i < string.length; i ++) {

      if (string[i] == '\n' && stringLine != '') {
        stringLine = stringLine.replace(/\n|\r/g, '');
        stringLine = this.removeBlank(stringLine);
        this.string[n] = {str : stringLine};
        n += 1;
        stringLine = '';
      }

      else {
        stringLine += string[i];
      }

    }
  }

  indexChar(char) {
    for (var i = 0; i < this.string.length; i ++) {
      for (var k = 0; k < this.string[i].str.length; k ++) {
        if (this.string[i].str[k] == char) {
          this.string[i][char] = k;
          break;
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

  selectInfo(string, location, com, char1, char2) {
    var refineString;

    if (string[char1] == undefined) {
      if (location == "before") { return string.str; }
      else { return ''; }
    }
    else {
      if(location == "before") { refineString = string.str.slice(0, string[char1] + com); } //char1 미 포함
      else if(location == "middle") { refineString = string.str.slice(string[char1] - 1 + com, string[char2] + com); } //char1,2 포함
      else if(location == "after") { refineString = string.str.slice(string[char1] + 1 - com, ); } //char1 포함
      return refineString;
    }

  }

  down() {
    this.down += 1;
  }


}
