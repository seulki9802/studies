export class Picture {
  constructor(x, y, width, name, birth, birthP, birthP2, death, deathP, deathP2, img, on, n) {

    this.initWidth = width;
    this.width = this.initWidth;
    this.height = this.width * 1.618;

		this.initX = x;
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
    this.selectedTime = 0;
    this.dx = 0;

    this.bigger = 1;
  }

  animate(ctx) {
    ctx.save();

    ctx.fillStyle = "green";
    if (this.isSelected) {ctx.fillStyle = "blue"; }

    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = '15px Arial';
    ctx.textBaseline = "hanging";
    for(var i = 0; i < this.name.length; i ++) {
      ctx.fillText(this.name[i], this.x + 10, this.y + 15 * (i + 1));
    }

    if (this.isSelected) { this.resizing(1); }
    else { this.resizing(0); }

    ctx.restore();
  }

  onClick(x, y) {
    if (x > this.x && x < this.x + this.width &&
  		y > this.y && y < this.y + this.height) {
        this.isSelected = 1;
        this.on = !this.on;
        return this
    }
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
    } else if (!this.on) { this.isSelected = 0; }
  }
}
