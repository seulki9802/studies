xport class Picture {
  constructor(x, y, width, name, birth, birthP, birthP2, death, deathP, deathP2, img, on, n) {

    this.initWidth = width;
    this.width = this.initWidth;
    this.height = this.width * 1.618;

    this.x = x;
    this.y = y;

    this.name = n;
    this.img = new Image();
    this.img.src = img;

    this.on = on;
    this.n = 0;
  }

  animate(ctx) {
    ctx.save();


    if (this.on) { ctx.strokeStyle = "white"; }
    else { ctx.strokeStyle = "blue"; }

    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.font = '30px Arial';
    ctx.textBaseline = "hanging";
    ctx.strokeText(this.name, this.x, this.y);

    try { ctx.drawImage(this.img, this.x, this.y, this.width, this.height); }
    catch {}

    if (this.on == 1 && this.width < this.initWidth * 2) {
      this.showPicture(1.1, ctx);
      this.n += 1;
    } else if (this.on == 1) {
      // try { ctx.drawImage(this.img, this.x, this.y, this.width, this.height / 2); }
      // catch {}
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

    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height / 2);
  }
}
