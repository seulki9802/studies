export class DataRefine {
  constructor(stageWidth, stageHeight, fontSize) {
    this.string = [];
    this.count = [];

    this.makeStringList();
    this.indexChar(":", "semi");
    this.indexChar("(", "bracket1")
    this.indexChar(")", "bracket1")

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

      // var beforeSemi = this.string[i].str.slice(0, this.string[i].semi + 1);
      // var afterSemi = this.string[i].str.slice(this.string[i].semi + 1, this.string[i].bracket);
      // var afterBracket = this.string[i].str.slice(this.string[i].bracket, );

      var beforeSemi = this.selectInfo(this.string[i], "before", "semi");
      var middle_Semi_To_Brac = this.selectInfo(this.string[i], "middle", "semi", "bracket");


      ctx.fillStyle = "red";
      ctx.fillText(beforeSemi, this.startX, this.startY + this.fontSize * i);

      ctx.fillStyle = "yellow";
      ctx.fillText(middle_Semi_To_Brac, this.startX + ctx.measureText(beforeSemi).width, this.startY + this.fontSize * i);

      // ctx.fillStyle = "blue";
      // ctx.fillText(afterBracket, this.startX + ctx.measureText(beforeSemi).width + ctx.measureText(afterSemi).width, this.startY + this.fontSize * i);

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

  indexChar(char, charName) {
    for (var i = 0; i < this.string.length; i ++) {
      for (var k = 0; k < this.string[i].str.length; k ++) {
        if (this.string[i].str[k] == char) {
          this.string[i][charName] = k;
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

  selectInfo(string, location, char1, char2) {
    var refineString;
    if(location == "before") { refineString = string.str.slice(0, string[char1] + 1); } //char1 포함
    else if(location == "middle") { refineString = string.str.slice(string[char1] + 1, string[char2]); } //char1, 2 미포함
    else if(location == "after") { refineString = string.str.slice(string[char1], ); } //char1 포함
    return refineString;
  }

  down() {
    this.down += 1;
  }


}
