export class Picture {
  constructor(x, y, width, name, birth, birthP, birthP2, death, deathP, deathP2, img, on, n) {

    this.initWidth = width;
    this.width = this.initWidth;
    this.height = this.width * 1.618;

    this.x = x;
    this.y = y;

    this.name = name.split(' ', name.length);
    // this.name = name;
    this.birth = birth;
    this.birthP = birthP;
    this.death = death;
    this.deathP = deathP;
    this.img = new Image();
    this.img.src = img;

    this.on = on;
		this.isSelected = 0;
    this.dx = 0;
    this.dy = 0;
    this.up = 0;
    this.upNumber = 0;

    this.bigger = 1;
  }

  animate(ctx) {
    ctx.save();

    ctx.fillStyle = "gray";
    if (this.isSelected) { ctx.fillStyle = "blue"; }
    if (this.on) { ctx.fillStyle = "black"; }

    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = '15px Arial';
    ctx.textBaseline = "hanging";

    for(var i = 0; i < this.name.length; i ++) {
      ctx.fillText(this.name[i], this.x + 10, this.y + 15 * (i + 1));
    }

    if (!this.on && (this.isSelected || this.upNumber)) {
      this.resizing_up(1);
    }
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
    var dy = -0.3;

    if(!this.up) {
      if (Math.floor(this.dy) > -10) {
        this.dy += dy;
        this.y += dy;
      } else { this.up = 1;}
    }

    if (this.up) {
      if (Math.floor(this.dy) < 0) {
        this.dy -= dy;
        this.y -= dy;
      }  else { this.up = 0; this.upNumber += 1; }
    }

    if (this.upNumber == 3) { this.isSelected = 0; }
  }

  onClick0(x, y) {
    if (this.on) { this.on = 0; }
    else {
      if (x > this.x && x < this.x + this.width &&
        y > this.y && y < this.y + this.height) {
          this.on = 1;
          return this;
      }
    }
  }

  onClick2(x, y) {
    if (x > this.x && x < this.x + this.width &&
      y > this.y && y < this.y + this.height) {
        this.on = !this.on;
        return this;
  	} else if (this.on) { this.on = !this.on; return 0	; }
  }
}
