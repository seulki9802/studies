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
    this.n = 0;
    this.random = 0;
  }

  animate(ctx) {
    ctx.save();

    if (!this.random && Math.random() < 0.0005) { this.random = 1; }
    if (this.random && Math.random() < 0.001) { this.random = 0; }

    // if (this.random) { ctx.fillStyle = "blue"; }
    // else { ctx.fillStyle = "black"; }

    ctx.fillStyle = "black";

    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = '15px Arial';
    ctx.textBaseline = "hanging";
    for(var i = 0; i < this.name.length; i ++) {
      ctx.fillText(this.name[i], this.x + 10, this.y + 15 * (i + 1));
    }

		if (this.on == 0 && this.random) {
      try { ctx.drawImage(
  			      this.img,
              this.x + this.width / 3,
              this.y + this.height / 2 - this.width / 3 / 2,
              this.width / 3,
              this.width / 3
      			);
          }
      catch {}
    }

    if (this.on == 1 && this.width < this.initWidth * 2) {
      this.showPicture(1.1, ctx);
      this.n += 1;
    } else if (this.on == 1) {
      try { ctx.drawImage(this.img, this.x, this.y, this.width, this.height / 2); }
      catch {}
      ctx.fillText(this.name, this.x + 10, this.y + this.height/2 + 15);
      ctx.fillText("birth: " + this.birth, this.x + 10, this.y + this.height/2 + 15 * 3);
      ctx.fillText("birth Place: " + this.birthP, this.x + 10, this.y + this.height/2 + 15 * 4);
      ctx.fillText("dath: " + this.dath, this.x + 10, this.y + this.height/2 + 15 * 6);
      ctx.fillText("dath Place: " + this.dathP, this.x + 10, this.y + this.height/2 + 15 * 7);
    }


    if (this.on == 2 && this.width != this.initWidth && this.n != 0) {
      this.showPicture(1 / 1.1, ctx);
      this.n -= 1;
      if (this.n == 0) {this.on = 0}
    }

    ctx.restore();
  }

  onClick(x, y, onNumber) {
    if (onNumber == 1) {
      if (x > this.x && x < this.x + this.width &&
      		y > this.y && y < this.y + this.height) {
            this.on = onNumber;
          }
    } else if (this.on == 1 && onNumber == 2) { this.on = onNumber; }
  }

  showPicture(speed, ctx) {
    this.x -= this.width * (speed - 1)/2;
    this.y -= this.height * (speed - 1)/2;
    this.width *= speed;
    this.height *= speed;
  }
}
