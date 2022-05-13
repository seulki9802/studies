export class Picture {
  constructor(x, y, width, name, birth, birthP, birthP2, death, deathP, deathP2, img, on, n) {

		//this.picture's size & place
    this.initWidth = width;
    this.width = this.initWidth;
    this.height = this.width * 1.618;
    this.x = x;
    this.y = y;

    //this picture's info
    this.name = name.split(' ', name.length);
    this.birth = birth;
    this.birthP = birthP;
    this.death = death;
    this.deathP = deathP;
    this.img = new Image();
    this.img.src = img;

		//set clicked & selected event
    this.on = on;
    this.dx = 0;
    this.dy = 0;
    this.isSelected = 0;
    this.up = 0;
    this.upNumber = 0;
  }

  animate(ctx) {
    ctx.save();

    //set color
    if (this.isSelected) { ctx.fillStyle = "blue"; }
    else if (this.on) { ctx.fillStyle = "black"; }
    else { ctx.fillStyle = "gray"; }

    //click me!
    if (this.isSelected && !this.on) { ctx.fillText('Cllick me!', this.x, this.y - 5); }

		//draw this picture box
    ctx.fillRect(this.x, this.y, this.width, this.height);

    //draw this picture's main info(name)
    ctx.fillStyle = "white";
    ctx.font = '15px Arial';
    ctx.textBaseline = "hanging";
    for(var i = 0; i < this.name.length; i ++) {
      ctx.fillText(this.name[i], this.x + 10, this.y + 15 * (i + 1));
    }

    //dancing box case - isSelected or wasSelected
    if (this.isSelected || this.upNumber) {
      this.resizing_up(1);
    }

    //isClick case
    if (this.on) { this.resizing(1); }
    else { this.resizing(0); }

    ctx.restore();
  }

  resizing(show) {
    if (show) {
      var dx = 0.5;
      var wantDx = this.initWidth / 2;
    } else {
      var dx = -0.5;
      var wantDx = 0;
    }

    if (this.dx != wantDx) {
      this.dx += dx;
      this.x -= dx;
      this.y -= dx * 1.618;
      this.width += dx * 2;
      this.height += dx * 2 * 1.618;
    } else if (!this.on) {}
  }

  resizing_up(show) {
    //dancing only when this pictures isn't clicked
    if (!this.on) { var dy = -0.3; }
    //mang hat su...
    else { var dy = 0;}

    //down~
    if(!this.up) {
      if (Math.floor(this.dy) > -10) {
        this.dy += dy;
        this.y += dy;
      } else { this.up = 1;}
    }

		//up~
    if (this.up) {
      if (Math.floor(this.dy) < 0) {
        this.dy -= dy;
        this.y -= dy;
      }  else { this.up = 0; this.upNumber += 1; }
    }

    //when up&down do for three times
    if (this.upNumber == 3) { this.isSelected = 0; }
  }

  onClick(x, y) {
    if (x > this.x && x < this.x + this.width &&
      y > this.y && y < this.y + this.height) {
        this.on = !this.on;
        if (this.isSelected) { this.isSelected = 0; }
        return this;
  	}
    //when click again but not on this picture
    else if (this.on) { this.on = !this.on; return 0; }
  }
}
